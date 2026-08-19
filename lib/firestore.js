import { DEMO_TOURS, DEMO_TESTIMONIALS, INITIAL_CONFIG } from './demo-data';

// ============================================================
// CAPA DE DATOS UNIFICADA - Server Side Only
// ============================================================
// Este archivo es importado SOLO por server components y API routes.
// Los componentes 'use client' NUNCA deben importar este archivo.
// Usan fetch('/api/...') para comunicarse con el servidor.
// ============================================================

let mysqlModule = null;
let mysqlLoadAttempted = false;

function getMySQLModule() {
  if (mysqlLoadAttempted) return mysqlModule;
  mysqlLoadAttempted = true;

  // Solo cargar en servidor
  if (typeof window !== 'undefined') return null;

  try {
    // Usar eval('require') para evitar que Webpack trace esta dependencia
    // cuando el archivo es analizado estáticamente durante el build.
    // En runtime (Node.js), require('./mysql') resuelve correctamente.
    const req = typeof __webpack_require__ === 'function'
      ? __non_webpack_require__
      : require;
    mysqlModule = req('./mysql');
    console.log('✅ MySQL module loaded successfully');
  } catch (e) {
    console.warn('⚠️ MySQL module not available, using demo data:', e.message);
    mysqlModule = null;
  }
  return mysqlModule;
}

export async function getTours(destination = 'all') {
  const mysql = getMySQLModule();
  if (mysql && mysql.fetchToursFromDB) {
    try {
      const tours = await mysql.fetchToursFromDB(destination);
      if (tours && tours.length > 0) return tours;
    } catch (e) {
      console.warn('MySQL getTours failed, using demo data:', e.message);
    }
  }

  if (destination === 'all') return DEMO_TOURS;
  return DEMO_TOURS.filter(t => t.destination === destination);
}

export async function getTourBySlug(slug) {
  const mysql = getMySQLModule();
  if (mysql && mysql.fetchTourBySlugFromDB) {
    try {
      const tour = await mysql.fetchTourBySlugFromDB(slug);
      if (tour) return tour;
    } catch (e) {
      console.warn('MySQL getTourBySlug failed, using demo data:', e.message);
    }
  }

  return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
}

export async function getTestimonials() {
  return DEMO_TESTIMONIALS;
}

export async function getGeneralConfig() {
  const mysql = getMySQLModule();
  if (mysql && mysql.fetchGeneralConfigFromDB) {
    try {
      const config = await mysql.fetchGeneralConfigFromDB();
      if (config && Object.keys(config).length > 0) {
        return { ...INITIAL_CONFIG, ...config };
      }
    } catch (e) {
      console.warn('MySQL getGeneralConfig failed, using demo data:', e.message);
    }
  }
  return INITIAL_CONFIG;
}

