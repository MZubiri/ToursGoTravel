import { NextResponse } from 'next/server';
import { fetchToursFromDB, saveTourToDB, deleteTourFromDB } from '@/lib/mysql';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || 'all';
    const tours = await fetchToursFromDB(destination);
    return NextResponse.json(tours);
  } catch (error) {
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
      const allTours = await fetchToursFromDB('all');
      return NextResponse.json({ success: true, tours: allTours });
    } else if (body && body.id) {
      await saveTourToDB(body);
      const allTours = await fetchToursFromDB('all');
      return NextResponse.json({ success: true, tour: body, tours: allTours });
    }

    return NextResponse.json({ error: 'Invalid tour payload' }, { status: 400 });
  } catch (error) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
