import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const DEFAULT_ROUTES = [
  { from: 'Antalya Havalimanı', to: 'Antalya Merkez', price: 40, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Lara', price: 40, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kundu', price: 40, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kaleiçi', price: 40, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Konyaaltı', price: 40, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Belek', price: 45, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Boğazkent', price: 45, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Denizyaka', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kumköy', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Gündoğdu', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Çolaklı', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Evrenseki', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Side', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Sorgun', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Manavgat', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Titreyengöl', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kızılot', price: 60, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kızılağaç', price: 60, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Okurcalar', price: 70, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Avsallar', price: 75, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'İncekum', price: 70, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Çenger', price: 70, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Konaklı', price: 75, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Türkler', price: 75, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Alanya', price: 75, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Mahmutlar', price: 90, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kargıcak', price: 90, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kestel', price: 90, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Beldibi', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Göynük', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kemer', price: 50, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Çamyuva', price: 55, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Kiriş', price: 55, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Tekirova', price: 60, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Olimpos', price: 85, currency: 'EUR' },
  { from: 'Antalya Havalimanı', to: 'Adrasan', price: 95, currency: 'EUR' },
];

// GET all routes - auto-seeds if empty
export async function GET() {
  try {
    let { data, error } = await supabase
      .from('route_price')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // Auto-seed if empty
    if (!data || data.length === 0) {
      console.log('route_price tablosu boş, varsayılan rotalar ekleniyor...');
      const { data: insertedData, error: insertError } = await supabase
        .from('route_price')
        .insert(DEFAULT_ROUTES)
        .select();

      if (insertError) {
        console.error('Auto-seed error:', insertError);
        return NextResponse.json([], { status: 500 });
      }
      data = insertedData || [];
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Routes GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bulk insert support
    if (Array.isArray(body)) {
      const { data, error } = await supabase
        .from('route_price')
        .insert(body)
        .select();
      if (error) throw error;
      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from('route_price')
      .insert({ 
        from: body.from, 
        to: body.to, 
        price: body.price, 
        price_vito: body.price_vito,
        price_maybach: body.price_maybach,
        price_minibus: body.price_minibus,
        currency: body.currency || 'EUR' 
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update route by id
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from('route_price')
      .update({ 
        from: body.from, 
        to: body.to, 
        price: body.price, 
        price_vito: body.price_vito,
        price_maybach: body.price_maybach,
        price_minibus: body.price_minibus,
        currency: body.currency 
      })
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE route
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase.from('route_price').delete().eq('id', parseInt(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
