'use client';
import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import { getStoredTours } from '@/lib/tours-store';

export default function PublicToursGrid({ initialTours, locale, dict, whatsappNumber, limit, filterDestination }) {
  const [tours, setTours] = useState(initialTours);

  useEffect(() => {
    const updateTours = () => {
      const stored = getStoredTours();
      let filtered = stored.filter(t => t.status !== 'draft');
      if (filterDestination && filterDestination !== 'all') {
        filtered = filtered.filter(t => t.destination === filterDestination);
      }
      setTours(filtered);
    };

    updateTours();
    window.addEventListener('tours_store_updated', updateTours);
    return () => window.removeEventListener('tours_store_updated', updateTours);
  }, [filterDestination]);

  const displayedTours = limit ? tours.slice(0, limit) : tours;

  if (displayedTours.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
        No hay tours disponibles en este momento.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
      {displayedTours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          locale={locale}
          dict={dict}
          whatsappNumber={whatsappNumber}
        />
      ))}
    </div>
  );
}
