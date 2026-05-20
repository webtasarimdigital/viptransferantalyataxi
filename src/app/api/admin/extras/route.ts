import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const DEFAULT_EXTRAS = [
  { name: 'Gül Buketi (10 Gül)', price: 30, currency: 'EUR', is_active: true },
  { name: 'Gül Buketi (20 Gül)', price: 45, currency: 'EUR', is_active: true },
  { name: 'Gül Buketi (50 Gül)', price: 110, currency: 'EUR', is_active: true },
  { name: 'Bira Efes Kutu 50CL', price: 7, currency: 'EUR', is_active: true },
  { name: 'Alkollü Şampanya 70CL', price: 40, currency: 'EUR', is_active: true },
  { name: 'Bebek Koltuğu (1-3 Yaş)', price: 0, currency: 'EUR', is_active: true },
  { name: 'Yükseltici Koltuk (4-9 Yaş)', price: 0, currency: 'EUR', is_active: true },
];

export async function GET() {
  try {
    let { data, error } = await supabase
      .from('extra_services')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // Auto-seed if the database table is completely empty
    if (!data || data.length === 0) {
      console.log('extra_services tablosu boş, varsayılan ekstralar ekleniyor...');
      const { data: insertedData, error: insertError } = await supabase
        .from('extra_services')
        .insert(DEFAULT_EXTRAS)
        .select();

      if (insertError) throw insertError;
      data = insertedData || [];
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, price, currency, is_active } = body;

    const { data, error } = await supabase
      .from('extra_services')
      .insert([{ name, image, price, currency, is_active }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, image, price, currency, is_active } = body;

    const { data, error } = await supabase
      .from('extra_services')
      .update({ name, image, price, currency, is_active })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    const { error } = await supabase
      .from('extra_services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
