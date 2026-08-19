import { NextResponse } from 'next/server';
import { fetchGeneralConfigFromDB, saveGeneralConfigToDB } from '@/lib/mysql';
import { INITIAL_CONFIG } from '@/lib/demo-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await fetchGeneralConfigFromDB();
    if (config && Object.keys(config).length > 0) {
      return NextResponse.json({ ...INITIAL_CONFIG, ...config });
    }
    return NextResponse.json(INITIAL_CONFIG);
  } catch (error) {
    console.error('API GET /config error:', error);
    return NextResponse.json(INITIAL_CONFIG);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid config payload' }, { status: 400 });
    }

    await saveGeneralConfigToDB(body);
    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    console.error('API POST /config error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
