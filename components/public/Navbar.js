'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { getWhatsAppLink, trackWhatsAppClick } from '@/lib/whatsapp';

export default function Navbar({ locale, dict, config }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.destinations, href: `/${locale}#destinos` },
    { label: dict.nav.tours, href: `/${locale}#tours` },
    { label: dict.nav.about, href: `/${locale}#nosotros` },
    { label: dict.nav.contact, href: `/${locale}#contacto` },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? '#FFFFFF' : 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.15)',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #D4A853' }}>
            <Image src={config.logo || "/images/logo.jpg"} alt={config.companyName} fill style={{ objectFit: 'cover' }} />
          </div>
          <span style={{ fontSize: '24px', fontWeight: '800', color: scrolled ? '#1B5E3B' : '#FFFFFF', letterSpacing: '-0.5px' }}>
            Go<span style={{ color: '#D4A853' }}>Travel</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-only">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: scrolled ? '#334155' : '#FFFFFF',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions (Language Selector & WA Button) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-only">
          <LanguageSelector currentLocale={locale} />
          <a
            href={getWhatsAppLink({ phone: config.whatsappNumber })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
          >
            <MessageCircle size={18} />
            <span>{dict.nav.bookNow}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{ color: scrolled ? '#0F172A' : '#FFFFFF', background: 'none', border: 'none', padding: '6px' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '24px',
            boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '18px', fontWeight: '600', color: '#0F172A' }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <LanguageSelector currentLocale={locale} />
            <a
              href={getWhatsAppLink({ phone: config.whatsappNumber })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
