'use client';
import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import { fetchServerTours } from '@/lib/tours-store';

export default function PublicToursGrid({ initialTours = [], locale, dict, whatsappNumber, limit, filterDestination }) {
  const [tours, setTours] = useState(initialTours);

  useEffect(() => {
    // Actualización de tours cuando ocurra un evento de admin o cambio de filtro
    const handleUpdate = async () => {
      const serverTours = await fetchServerTours();
      if (Array.isArray(serverTours) && serverTours.length > 0) {
        let filtered = serverTours.filter(t => t.status !== 'draft');
        if (filterDestination && filterDestination !== 'all') {
          filtered = filtered.filter(t => t.destination === filterDestination);
        }
        setTours(filtered);
      }
    };

    window.addEventListener('tours_store_updated', handleUpdate);
    return () => window.removeEventListener('tours_store_updated', handleUpdate);
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
