import { getTours, getGeneralConfig } from '@/lib/firestore';
import Link from 'next/link';
import { Compass, MessageCircle, Star, Eye, Plus, Settings } from 'lucide-react';

export default async function AdminDashboardPage() {
  const tours = await getTours('all');
  const config = await getGeneralConfig();

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
            Panel de Control
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B' }}>
            Bienvenido al centro de administración de GoTravel
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            href="/admin/tours"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1B5E3B',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: '0 4px 14px rgba(27, 94, 59, 0.25)',
              textDecoration: 'none',
            }}
          >
            <Plus size={18} />
            <span>Gestionar Tours</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Tours Activos</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F0FDF4', color: '#1B5E3B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={22} />
            </div>
          </div>
          <span style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A' }}>{tours.length}</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Clics a WhatsApp</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={22} />
            </div>
          </div>
          <span style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A' }}>148</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Calificación Promedio</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#B38938', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={22} fill="#B38938" />
            </div>
          </div>
          <span style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A' }}>4.9 / 5</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>WhatsApp Configurado</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={22} />
            </div>
          </div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#1B5E3B' }}>{config.whatsappNumber}</span>
        </div>

      </div>

      {/* Recent Tours Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '20px' }}>
          Tours en el Sistema
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: '600' }}>
                <th style={{ padding: '12px' }}>Tour</th>
                <th style={{ padding: '12px' }}>Destino</th>
                <th style={{ padding: '12px' }}>Precio MXN</th>
                <th style={{ padding: '12px' }}>Duración</th>
                <th style={{ padding: '12px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 12px', fontWeight: '700', color: '#0F172A' }}>
                    {t.title.es}
                  </td>
                  <td style={{ padding: '16px 12px', color: '#475569', textTransform: 'capitalize' }}>
                    {t.destination}
                  </td>
                  <td style={{ padding: '16px 12px', fontWeight: '700', color: '#1B5E3B' }}>
                    ${t.priceAdult.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 12px', color: '#64748B' }}>
                    {t.duration}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ backgroundColor: '#F0FDF4', color: '#1B5E3B', padding: '4px 12px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>
                      Publicado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
