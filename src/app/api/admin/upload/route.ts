import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan büyük olamaz!' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vkwzxezehrkhombjorvo.supabase.co';
    // Use service role key if available (bypasses RLS for uploads)
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY 
      || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 
      || 'sb_publishable_9oc_GA_4A2SIkJSengCU_Q_Ed_09K0_';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Convert File to ArrayBuffer then Uint8Array for compatibility
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      
      // If bucket doesn't exist, create it
      if (error.message.includes('Bucket not found')) {
        const { error: bucketError } = await supabase.storage.createBucket('gallery', { public: true });
        if (bucketError) {
          return NextResponse.json({ error: 'Bucket oluşturulamadı: ' + bucketError.message }, { status: 500 });
        }
        
        // Retry
        const retry = await supabase.storage
          .from('gallery')
          .upload(filePath, buffer, { contentType: file.type, upsert: false });
        
        if (retry.error) {
          return NextResponse.json({ error: 'Görsel yüklenemedi: ' + retry.error.message }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'Görsel yüklenemedi: ' + error.message }, { status: 500 });
      }
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: 'Sunucu hatası: ' + (error.message || 'Bilinmeyen hata') }, { status: 500 });
  }
}
