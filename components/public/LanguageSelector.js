'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { languageNames, locales } from '@/lib/i18n';

export default function LanguageSelector({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languageNames[currentLocale] || languageNames.es;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (newLocale) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;
    
    // Sustituir la primera parte del path /[locale]/...
    const segments = pathname.split('/');
    if (locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '20px',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Globe size={16} />
        <span>{currentLang.flag} {currentLang.name}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            minWidth: '150px',
            zIndex: 100,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLanguage(loc)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: currentLocale === loc ? '700' : '500',
                color: currentLocale === loc ? '#1B5E3B' : '#334155',
                backgroundColor: currentLocale === loc ? '#F0FDF4' : 'transparent',
                textAlign: 'left',
                transition: 'background 0.15s ease'
              }}
            >
              <span>{languageNames[loc].flag}</span>
              <span>{languageNames[loc].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
