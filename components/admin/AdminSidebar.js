'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Compass, Settings, LogOut, ExternalLink } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Gestión de Tours', href: '/admin/tours', icon: Compass },
    { label: 'Configuración', href: '/admin/config', icon: Settings },
  ];

  const handleLogout = () => {
    // Redirigir al sitio público o login
    router.push('/admin/login');
  };

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        minHeight: '100vh',
        padding: '28px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #1E293B',
      }}
    >
      <div>
        {/* Brand */}
        <div style={{ marginBottom: '40px', padding: '0 8px' }}>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
            Go<span style={{ color: '#D4A853' }}>Travel</span>
          </span>
          <span style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Panel de Control
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  backgroundColor: isActive ? '#1B5E3B' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <Icon size={20} color={isActive ? '#D4A853' : '#94A3B8'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px', borderTop: '1px solid #1E293B' }}>
        <Link
          href="/es"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#94A3B8',
            fontWeight: '600',
          }}
        >
          <ExternalLink size={18} />
          <span>Ver sitio público</span>
        </Link>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#EF4444',
            fontWeight: '600',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
