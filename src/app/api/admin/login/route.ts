import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'viptransfer26.';

  if (username === adminUsername && password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
}

