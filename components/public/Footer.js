import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer({ locale, dict, config }) {
  return (
    <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid #1E293B' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '46px', height: '46px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D4A853', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                <Image src={config.logo || "/images/logo.jpg"} alt={config.companyName} fill style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#FFFFFF' }}>
                Go<span style={{ color: '#D4A853' }}>Travel</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#94A3B8', marginBottom: '24px' }}>
              {dict.footer.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={config.socialMedia.instagram} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Instagram size={18} />
              </a>
              <a href={config.socialMedia.facebook} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '20px' }}>
              {dict.footer.quickLinks}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link href={`/${locale}`} style={{ color: '#94A3B8' }}>{dict.nav.home}</Link></li>
              <li><Link href={`/${locale}#destinos`} style={{ color: '#94A3B8' }}>{dict.nav.destinations}</Link></li>
              <li><Link href={`/${locale}/tours`} style={{ color: '#94A3B8' }}>{dict.nav.tours}</Link></li>
              <li><Link href={`/${locale}#nosotros`} style={{ color: '#94A3B8' }}>{dict.nav.about}</Link></li>
              <li><Link href={`/${locale}#contacto`} style={{ color: '#94A3B8' }}>{dict.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '20px' }}>
              {dict.footer.topDestinations}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link href={`/${locale}/tours?destination=cabos`} style={{ color: '#94A3B8' }}>Tours en Los Cabos</Link></li>
              <li><Link href={`/${locale}/tours?destination=cancun`} style={{ color: '#94A3B8' }}>Tours en Cancún</Link></li>
              <li><Link href={`/${locale}/tours?destination=vallarta`} style={{ color: '#94A3B8' }}>Tours en Puerto Vallarta</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '20px' }}>
              {dict.footer.contactInfo}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#D4A853" />
                <span>{config.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#D4A853" />
                <span>{config.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#D4A853" />
                <span>México</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '30px', borderTop: '1px solid #1E293B', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
