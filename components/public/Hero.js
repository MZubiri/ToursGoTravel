'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/lib/whatsapp';

export default function Hero({ locale, dict, config }) {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
        backgroundColor: '#0F172A',
      }}
    >
      {/* Background Image */}
      <Image
        src={config.heroImage || "/images/hero.jpg"}
        alt="Hero Background"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.65 }}
      />

      {/* Dark Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%)',
          zIndex: 1,
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          color: '#FFFFFF',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            fontWeight: '800',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#D4A853',
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          DESCUBRE MÉXICO
        </p>

        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '20px',
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          Vive Experiencias Inolvidables
        </h1>

        <p
          style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: 1.6,
            marginBottom: '36px',
            fontWeight: '400',
            maxWidth: '720px',
            margin: '0 auto 36px',
          }}
        >
          Tours exclusivos y paquetes vacacionales en Los Cabos, Cancún y Puerto Vallarta
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href={`/${locale}#tours`}
            style={{
              backgroundColor: '#1B5E3B',
              color: '#FFFFFF',
              padding: '16px 36px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '17px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(27, 94, 59, 0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            Explorar Tours
          </Link>

          <a
            href={getWhatsAppLink({ phone: config.whatsappNumber })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '17px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)',
            }}
          >
            <MessageCircle size={20} />
            <span>Hablar con un Asesor</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#destinos"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFFFFF',
          zIndex: 2,
          opacity: 0.85,
          transition: 'opacity 0.2s ease',
        }}
      >
        <ChevronDown size={32} className="animate-bounce" />
      </a>
    </section>
  );
}
