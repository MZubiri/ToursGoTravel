import { NextResponse } from 'next/server';
import { DEMO_TOURS } from '@/lib/demo-data';
import fs from 'fs';
import path from 'path';

// Guardar en memoria y en archivo temporal de servidor
let memoryTours = [...DEMO_TOURS];
const DATA_FILE = path.join(process.cwd(), 'docs', 'tours_data.json');

function loadFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryTours = parsed;
      }
    }
  } catch (e) {
    // Usar datos en memoria
  }
  return memoryTours;
}

export async function GET() {
  const tours = loadFromFile();
  return NextResponse.json(tours);
}

export async function POST(request) {
  try {
    const updatedTours = await request.json();
    if (Array.isArray(updatedTours)) {
      memoryTours = updatedTours;
      try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(updatedTours, null, 2), 'utf8');
      } catch (err) {
        console.warn("Could not write to file system, using memory storage:", err);
      }
      return NextResponse.json({ success: true, tours: memoryTours });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: false }, { status: 400 });
}
