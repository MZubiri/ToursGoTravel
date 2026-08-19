import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    // Log del mensaje de contacto (se puede expandir a MySQL o email en el futuro)
    console.log('📩 Nuevo mensaje de contacto:', {
      name: body.name,
      email: body.email,
      destination: body.destination,
      message: body.message,
      locale: body.locale,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API POST /contact error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
