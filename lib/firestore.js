import { DEMO_TOURS, DEMO_TESTIMONIALS, INITIAL_CONFIG } from './demo-data';
import {
  fetchToursFromDB,
  fetchTourBySlugFromDB,
  fetchGeneralConfigFromDB,
  getWhatsAppClickCount
} from './mysql';

// ============================================================
// CAPA DE DATOS UNIFICADA - Direct MySQL Access (ultra-rápido ~2ms)
// ============================================================

export async function getTours(destination = 'all') {
  if (typeof window !== 'undefined') return DEMO_TOURS;
  
  try {
    const tours = await fetchToursFromDB(destination);
    if (tours && tours.length > 0) return tours;
  } catch (e) {
    console.warn('getTours direct DB fetch failed, using demo data:', e.message);
  }

  if (destination === 'all') return DEMO_TOURS;
  return DEMO_TOURS.filter(t => t.destination === destination);
}

export async function getTourBySlug(slug) {
  if (typeof window !== 'undefined') return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
  
  try {
    const tour = await fetchTourBySlugFromDB(slug);
    if (tour) return tour;
  } catch (e) {
    console.warn('getTourBySlug direct DB fetch failed, using demo data:', e.message);
  }

  return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
}

export async function getTestimonials() {
  return DEMO_TESTIMONIALS;
}

export async function getGeneralConfig() {
  if (typeof window !== 'undefined') return INITIAL_CONFIG;
  
  try {
    const config = await fetchGeneralConfigFromDB();
    if (config && typeof config === 'object' && Object.keys(config).length > 0) {
      return { ...INITIAL_CONFIG, ...config };
    }
  } catch (e) {
    console.warn('getGeneralConfig direct DB fetch failed, using demo data:', e.message);
  }
  return INITIAL_CONFIG;
}

export async function getWhatsAppStats() {
  if (typeof window !== 'undefined') return 0;
  
  try {
    const count = await getWhatsAppClickCount();
    return Number(count) || 0;
  } catch (e) {
    console.warn('getWhatsAppStats direct DB fetch failed:', e.message);
  }
  return 0;
}
