import { DEMO_TOURS } from './demo-data';

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
    console.warn("Could not fetch tours from MySQL API, using fallback:", e);
  }
  return DEMO_TOURS;
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
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('tours_store_updated'));
      }
      return result;
    }
  } catch (e) {
    console.error("Error saving tour to MySQL server:", e);
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
    console.error("Error deleting tour from MySQL server:", e);
  }
  return false;
}
