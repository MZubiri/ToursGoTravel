import { DEMO_TOURS } from './demo-data';

const STORAGE_KEY = 'gotravel_tours_store';

export function getStoredTours() {
  if (typeof window === 'undefined') {
    return DEMO_TOURS;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading stored tours:", e);
  }
  return DEMO_TOURS;
}

export function saveStoredTours(tours) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tours));
    window.dispatchEvent(new Event('tours_store_updated'));
    
    // Sync with API route for server side persistence
    fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tours)
    }).catch(err => console.warn("API sync fallback:", err));

  } catch (e) {
    console.error("Error saving stored tours:", e);
  }
}
