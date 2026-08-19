import { DEMO_TOURS, DEMO_TESTIMONIALS, INITIAL_CONFIG } from './demo-data';

// ============================================================
// CAPA DE DATOS UNIFICADA - Server Side Only
// ============================================================
// Esta capa funciona SOLO en el servidor (API routes, server components).
// Los componentes cliente NUNCA importan este archivo directamente,
// sino que usan fetch('/api/tours') para obtener datos.
// ============================================================

let mysqlModule = null;
let mysqlLoadAttempted = false;

function getMySQLModule() {
  if (mysqlLoadAttempted) return mysqlModule;
  mysqlLoadAttempted = true;
  try {
    mysqlModule = require('./mysql');
  } catch (e) {
    console.warn('MySQL module not available, using demo data fallback:', e.message);
    mysqlModule = null;
  }
  return mysqlModule;
}

export async function getTours(destination = 'all') {
  const mysql = getMySQLModule();
  if (mysql && mysql.fetchToursFromDB) {
    try {
      return await mysql.fetchToursFromDB(destination);
    } catch (e) {
      console.warn('MySQL getTours failed:', e.message);
    }
  }

  if (destination === 'all') return DEMO_TOURS;
  return DEMO_TOURS.filter(t => t.destination === destination);
}

export async function getTourBySlug(slug) {
  const mysql = getMySQLModule();
  if (mysql && mysql.fetchTourBySlugFromDB) {
    try {
      return await mysql.fetchTourBySlugFromDB(slug);
    } catch (e) {
      console.warn('MySQL getTourBySlug failed:', e.message);
    }
  }

  return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
}

export async function getTestimonials() {
  return DEMO_TESTIMONIALS;
}

export async function getGeneralConfig() {
  return INITIAL_CONFIG;
}
