import { getDictionary, locales, defaultLocale } from '@/lib/i18n';
import { getTourBySlug, getGeneralConfig } from '@/lib/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, CheckCircle, XCircle, MessageCircle, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default async function TourDetailPage({ params }) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const config = await getGeneralConfig();
  const tour = await getTourBySlug(params.slug);

  const title = tour.title[locale] || tour.title.es || '';
  const fullDesc = tour.fullDescription[locale] || tour.fullDescription.es || '';
  const includesList = tour.includes[locale] || tour.includes.es || [];
  const excludesList = tour.excludes[locale] || tour.excludes.es || [];

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
    <div style={{ paddingTop: '110px', paddingBottom: '100px', backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#64748B' }}>{dict.nav.home}</Link>
          <ChevronRight size={14} />
          <Link href={`/${locale}/tours`} style={{ color: '#64748B' }}>{dict.nav.tours}</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#1B5E3B', fontWeight: '700' }}>{title}</span>
        </div>

        {/* Title Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D4A853', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>
            <MapPin size={16} />
            <span>{destName}, México</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: '800', color: '#0F172A', lineHeight: 1.2, marginBottom: '16px' }}>
            {title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={18} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontWeight: '700', color: '#0F172A' }}>{tour.rating || 4.9}</span>
              <span style={{ color: '#64748B' }}>({tour.reviewsCount || 40} reseñas)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: '600' }}>
              <Clock size={18} color="#1B5E3B" />
              <span>{tour.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: '600' }}>
              <Users size={18} color="#1B5E3B" />
              <span>Hasta {tour.maxCapacity} personas</span>
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '48px',
          }}
        >
          <div style={{ position: 'relative', height: '420px', gridColumn: 'span 2' }} className="gallery-main">
            <Image
              src={tour.images[0] || "/images/hero.jpg"}
              alt={title}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          {tour.images.slice(1, 3).map((img, i) => (
            <div key={i} style={{ position: 'relative', height: '200px' }} className="gallery-thumb">
              <Image src={img} alt={`${title} ${i+2}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* Content & Sidebar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '48px', alignItems: 'start' }} className="detail-layout">
          
          {/* Main Info */}
          <div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
                Descripción del Tour
              </h2>
              <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {fullDesc}
              </p>
            </div>

            {/* Includes & Excludes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1B5E3B', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={22} />
                  <span>{dict.tours.includes}</span>
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {includesList.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#334155' }}>
                      <span style={{ color: '#1B5E3B', fontWeight: '700' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#E63946', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <XCircle size={22} />
                  <span>{dict.tours.excludes}</span>
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {excludesList.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#64748B' }}>
                      <span style={{ color: '#E63946', fontWeight: '700' }}>✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Reservation Card */}
          <div style={{ position: 'sticky', top: '130px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                border: '1px solid #E2E8F0',
              }}
            >
              <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Precio por persona</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '800', color: '#1B5E3B' }}>
                    ${tour.priceAdult.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#64748B' }}>MXN</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#475569' }}>
                  <ShieldCheck size={20} color="#1B5E3B" />
                  <span>Sin cargos ocultos — Pago seguro</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#475569' }}>
                  <Clock size={20} color="#1B5E3B" />
                  <span>Reserva rápida en menos de 2 minutos</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink({ phone: config.whatsappNumber, customMessage: waMessage })}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  fontSize: '17px',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                  textAlign: 'center',
                }}
              >
                <MessageCircle size={22} />
                <span>{dict.tours.bookWhatsapp}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
