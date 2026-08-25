'use client';
import { useState, useEffect, useCallback } from 'react';
import TourCard from './TourCard';
import TourCardSkeleton from '@/components/ui/TourCardSkeleton';

export default function PublicToursGrid({ initialTours = [], locale, dict, whatsappNumber, limit, filterDestination }) {
  const [tours, setTours] = useState(initialTours);
  const [isLoading, setIsLoading] = useState(initialTours.length === 0);

  const fetchFreshTours = useCallback(async () => {
    try {
      const res = await fetch('/api/tours', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return;

      let filtered = data.filter(t => t.status !== 'draft');
      if (filterDestination && filterDestination !== 'all') {
        filtered = filtered.filter(t => t.destination === filterDestination);
      }
      setTours(filtered);
    } catch (e) {
      console.warn('Error fetching tours:', e);
    } finally {
      setIsLoading(false);
    }
  }, [filterDestination]);

  useEffect(() => {
    // Siempre obtener datos frescos de MySQL al montar el componente
    fetchFreshTours();

    // También escuchar eventos locales del admin (misma pestaña)
    const handleUpdate = () => fetchFreshTours();
    window.addEventListener('tours_store_updated', handleUpdate);
    return () => window.removeEventListener('tours_store_updated', handleUpdate);
  }, [fetchFreshTours]);

  if (isLoading) {
    return <TourCardSkeleton count={limit || 3} />;
  }

  const displayedTours = limit ? tours.slice(0, limit) : tours;

  if (displayedTours.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
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
