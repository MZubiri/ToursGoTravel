import { DEMO_TOURS, DEMO_TESTIMONIALS, INITIAL_CONFIG } from './demo-data';

// ============================================================
// CAPA DE DATOS UNIFICADA - Server Side Only
// ============================================================
// Este archivo es importado por server components y API routes.
// Utiliza fetch() interno a las API routes para obtener datos
// frescos de MySQL de forma confiable en el standalone build.
// ============================================================

const INTERNAL_API_BASE = `http://localhost:${process.env.PORT || 3000}`;

export async function getTours(destination = 'all') {
  if (typeof window !== 'undefined') return DEMO_TOURS;
  
  try {
    const url = destination !== 'all'
      ? `${INTERNAL_API_BASE}/api/tours?destination=${destination}`
      : `${INTERNAL_API_BASE}/api/tours`;
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (e) {
    console.warn('getTours internal fetch failed, using demo data:', e.message);
  }

  if (destination === 'all') return DEMO_TOURS;
  return DEMO_TOURS.filter(t => t.destination === destination);
}

export async function getTourBySlug(slug) {
  if (typeof window !== 'undefined') return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
  
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/tours`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const found = data.find(t => t.slug === slug);
        if (found) return found;
      }
    }
  } catch (e) {
    console.warn('getTourBySlug internal fetch failed, using demo data:', e.message);
  }

  return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
}

export async function getTestimonials() {
  return DEMO_TESTIMONIALS;
}

export async function getGeneralConfig() {
  if (typeof window !== 'undefined') return INITIAL_CONFIG;
  
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/config`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        return { ...INITIAL_CONFIG, ...data };
      }
    }
  } catch (e) {
    console.warn('getGeneralConfig internal fetch failed, using demo data:', e.message);
  }
  return INITIAL_CONFIG;
}

export async function getWhatsAppStats() {
  if (typeof window !== 'undefined') return 0;
  
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/stats/whatsapp`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return Number(data.count) || 0;
    }
  } catch (e) {
    console.warn('getWhatsAppStats internal fetch failed:', e.message);
  }
  return 0;
}
