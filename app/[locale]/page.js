import { getDictionary, locales, defaultLocale } from '@/lib/i18n';
import { getTours, getTestimonials, getGeneralConfig } from '@/lib/firestore';
import Hero from '@/components/public/Hero';
import DestinationCard from '@/components/public/DestinationCard';
import PublicToursGrid from '@/components/public/PublicToursGrid';
import Testimonials from '@/components/public/Testimonials';
import ContactForm from '@/components/public/ContactForm';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, Award, Headphones } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const config = await getGeneralConfig();
  const tours = await getTours('all');
  const testimonials = await getTestimonials();

  const destinations = [
    {
      id: 'cabos',
      name: dict.destinations.cabos,
      count: tours.filter(t => t.destination === 'cabos').length || 3,
      image: '/images/cabos.jpg'
    },
    {
      id: 'cancun',
      name: dict.destinations.cancun,
      count: tours.filter(t => t.destination === 'cancun').length || 4,
      image: '/images/cancun.jpg'
    },
    {
      id: 'vallarta',
      name: dict.destinations.vallarta,
      count: tours.filter(t => t.destination === 'vallarta').length || 2,
      image: '/images/vallarta.jpg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero locale={locale} dict={dict} config={config} />

      {/* Destinations Section */}
      <section id="destinos" style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <div style={{ color: '#1B5E3B', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Destinos Exclusivos
            </div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
              {dict.destinations.title}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              {dict.destinations.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                name={dest.name}
                count={dest.count}
                image={dest.image}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tours Catalog Section */}
      <section id="tours" style={{ padding: '100px 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ color: '#D4A853', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Catálogo de Experiencias
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: '#0F172A' }}>
                {dict.tours.title}
              </h2>
            </div>

            <Link
              href={`/${locale}/tours`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1B5E3B',
                fontWeight: '700',
                fontSize: '16px',
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: '#F0FDF4',
              }}
            >
              <span>Ver todos los tours</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Tours Grid Sincronizado */}
          <PublicToursGrid
            initialTours={tours}
            locale={locale}
            dict={dict}
            whatsappNumber={config.whatsappNumber}
            limit={6}
          />
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px' }}>
            <div style={{ color: '#1B5E3B', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Nuestra Promesa
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
              {dict.about.title}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              {dict.about.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '32px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', backgroundColor: '#F0FDF4', color: '#1B5E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
                {dict.about.feature1Title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
                {dict.about.feature1Desc}
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '32px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', backgroundColor: '#FEF3C7', color: '#B38938', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Headphones size={28} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
                {dict.about.feature2Title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
                {dict.about.feature2Desc}
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '32px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
                {dict.about.feature3Title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
                {dict.about.feature3Desc}
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '32px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', backgroundColor: '#FDF2F8', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
                {dict.about.feature4Title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
                {dict.about.feature4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} locale={locale} dict={dict} />

      {/* Contact Form */}
      <ContactForm locale={locale} dict={dict} config={config} />
    </div>
  );
}
