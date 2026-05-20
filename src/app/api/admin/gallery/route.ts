import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET all gallery items
export async function GET() {
  const { data, error } = await supabase.from('gallery').select('*').order('id');
  if (error) {
    return NextResponse.json([], { status: 500 });
  }
  return NextResponse.json(data);
}

// POST new gallery item (URL based)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('gallery')
    .insert({ url: body.url, type: body.type || 'image' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // Revalidate gallery cache
  try {
    revalidateTag('gallery-items', 'max');
  } catch (e) {
    console.error('Revalidate failed', e);
  }

  return NextResponse.json(data);
}

// DELETE gallery item
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const { error } = await supabase.from('gallery').delete().eq('id', parseInt(id));
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate gallery cache
  try {
    revalidateTag('gallery-items', 'max');
  } catch (e) {
    console.error('Revalidate failed', e);
  }

  return NextResponse.json({ success: true });
}
