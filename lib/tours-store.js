// ============================================================
// Cliente de API para Tours - Comunicación con MySQL via API Routes
// ============================================================
// Este módulo es usado por componentes CLIENTE (admin panel, PublicToursGrid)
// para comunicarse con el servidor que tiene MySQL.
// ============================================================

export async function fetchServerTours() {
  try {
    const res = await fetch('/api/tours', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Error fetching tours from API:", e);
  }
  return [];
}

export async function saveTourToServer(tour) {
  try {
    const res = await fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tour)
    });
    if (res.ok) {
      const result = await res.json();
      // Disparar evento local para actualizar componentes en la misma pestaña
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('tours_store_updated'));
      }
      return result;
    }
  } catch (e) {
    console.error("Error saving tour:", e);
  }
  return null;
}

export async function deleteTourFromServer(id) {
  try {
    const res = await fetch(`/api/tours?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('tours_store_updated'));
      }
      return true;
    }
  } catch (e) {
    console.error("Error deleting tour:", e);
  }
  return false;
}
