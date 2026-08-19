import { getDictionary, locales, defaultLocale } from '@/lib/i18n';
import { getTours, getGeneralConfig } from '@/lib/firestore';
import PublicToursGrid from '@/components/public/PublicToursGrid';
import Link from 'next/link';

export default async function ToursPage({ params, searchParams }) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const config = await getGeneralConfig();
  const selectedDest = searchParams?.destination || 'all';

  const tours = await getTours(selectedDest);

  const filterTabs = [
    { id: 'all', label: dict.tours.filterAll },
    { id: 'cabos', label: dict.destinations.cabos },
    { id: 'cancun', label: dict.destinations.cancun },
    { id: 'vallarta', label: dict.destinations.vallarta },
  ];

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            {dict.tours.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#64748B' }}>
            {dict.tours.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = selectedDest === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.id === 'all' ? `/${locale}/tours` : `/${locale}/tours?destination=${tab.id}`}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontSize: '15px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#1B5E3B' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #1B5E3B' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 6px 18px rgba(27, 94, 59, 0.25)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Tours Grid Sincronizado */}
        <PublicToursGrid
          initialTours={tours}
          locale={locale}
          dict={dict}
          whatsappNumber={config.whatsappNumber}
          filterDestination={selectedDest}
        />

      </div>
    </div>
  );
}
