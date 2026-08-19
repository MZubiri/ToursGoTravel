import { NextResponse } from 'next/server';
import { fetchToursFromDB, saveTourToDB, deleteTourFromDB } from '@/lib/mysql';

// Forzar que esta ruta sea dinámica
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || 'all';
    const tours = await fetchToursFromDB(destination);
    return NextResponse.json(tours);
  } catch (error) {
    console.error('API GET /tours error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      for (const tour of body) {
        await saveTourToDB(tour);
      }
    } else if (body && body.id) {
      await saveTourToDB(body);
    } else {
      return NextResponse.json({ error: 'Invalid tour payload' }, { status: 400 });
    }

    const allTours = await fetchToursFromDB('all');
    return NextResponse.json({ success: true, tours: allTours });
  } catch (error) {
    console.error('API POST /tours error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Tour ID is required' }, { status: 400 });
    }
    await deleteTourFromDB(id);
    const allTours = await fetchToursFromDB('all');
    return NextResponse.json({ success: true, tours: allTours });
  } catch (error) {
    console.error('API DELETE /tours error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
