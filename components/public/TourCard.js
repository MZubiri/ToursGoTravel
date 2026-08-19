import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/lib/whatsapp';

export default function TourCard({ tour, locale, dict, whatsappNumber }) {
  const title = tour.title[locale] || tour.title.es || '';
  const shortDesc = tour.shortDescription[locale] || tour.shortDescription.es || '';
  const destinationNames = {
    cabos: 'Los Cabos',
    cancun: 'Cancún',
    vallarta: 'Puerto Vallarta'
  };
  const destName = destinationNames[tour.destination] || tour.destination;

  const waMessage = dict.tours.whatsappMsg
    .replace('{tour}', title)
    .replace('{destination}', destName);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
        border: '1px solid #F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="tour-card"
    >
      {/* Image Container */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <Image
          src={tour.images[0] || "/images/hero.jpg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="tour-img"
        />
        
        {/* Destination Tag */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '700',
            padding: '6px 14px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {destName}
        </div>

        {/* Rating Tag */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            fontSize: '13px',
            fontWeight: '700',
            padding: '6px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Star size={14} fill="#F59E0B" color="#F59E0B" />
          <span>{tour.rating || 4.9}</span>
          <span style={{ color: '#94A3B8', fontWeight: '400' }}>({tour.reviewsCount || 24})</span>
        </div>
      </div>

      {/* Body Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '10px', lineHeight: 1.3 }}>
          {title}
        </h3>

        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
          {shortDesc}
        </p>

        {/* Attributes (Duration & Capacity) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 16px',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#475569',
            fontWeight: '600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="#1B5E3B" />
            <span>{tour.duration}</span>
          </div>
          <div style={{ width: '1px', height: '14px', backgroundColor: '#CBD5E1' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} color="#1B5E3B" />
            <span>Hasta {tour.maxCapacity} paxs</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
          <div>
            <span style={{ display: 'block', fontSize: '12px', color: '#94A3B8', fontWeight: '500' }}>
              {dict.tours.priceFrom}
            </span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#1B5E3B' }}>
              ${tour.priceAdult.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>MXN</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              href={`/${locale}/tours/${tour.slug}`}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#334155',
                transition: 'background 0.2s ease',
              }}
              title={dict.tours.viewDetails}
            >
              <ArrowRight size={18} />
            </Link>

            <a
              href={getWhatsAppLink({ phone: whatsappNumber, customMessage: waMessage })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '0 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                transition: 'background 0.2s ease',
              }}
            >
              <MessageCircle size={16} />
              <span>Reservar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
