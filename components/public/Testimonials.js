import { Star, Quote } from 'lucide-react';

export default function Testimonials({ testimonials, locale, dict }) {
  return (
    <section style={{ padding: '90px 0', backgroundColor: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
          <div style={{ color: '#D4A853', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Testimonios
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            {dict.testimonials.title}
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B' }}>
            {dict.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {testimonials.map((test) => {
            const textContent = test.text[locale] || test.text.es || '';
            return (
              <div
                key={test.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  border: '1px solid #E2E8F0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Quote size={40} color="#E2E8F0" style={{ position: 'absolute', top: '24px', right: '24px' }} />
                
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Content */}
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                  "{textContent}"
                </p>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#1B5E3B',
                      color: '#FFFFFF',
                      fontWeight: '800',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
                      {test.name}
                    </span>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
                      Viajero en {test.destination}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
