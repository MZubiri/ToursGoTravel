import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function DestinationCard({ id, name, count, image, locale, dict }) {
  return (
    <Link
      href={`/${locale}/tours?destination=${id}`}
      style={{
        position: 'relative',
        height: '380px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'block',
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="destination-card"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        className="dest-img"
      />
      
      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.85) 100%)',
        }}
      />

      {/* Card Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D4A853', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', marginBottom: '6px' }}>
          <MapPin size={16} />
          <span>México</span>
        </div>

        <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
          {name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#CBD5E1', fontWeight: '500' }}>
            {count} {dict.destinations.toursAvailable}
          </span>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
