import { NextResponse } from 'next/server';
import { getWhatsAppClickCount, incrementWhatsAppClickCount } from '@/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const count = await getWhatsAppClickCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('API GET /stats/whatsapp error:', error);
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    await incrementWhatsAppClickCount();
    const count = await getWhatsAppClickCount();
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('API POST /stats/whatsapp error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
