'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Compass, Settings, LogOut, ExternalLink, Menu, X } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-colapsar el menú lateral en cualquier cambio de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Gestión de Tours', href: '/admin/tours', icon: Compass },
    { label: 'Configuración', href: '/admin/config', icon: Settings },
  ];

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem('gotravel_admin_token');
    document.cookie = "gotravel_admin_token=; path=/; max-age=0;";
    router.replace('/admin/login');
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        .admin-mobile-header {
          display: none;
        }
        .admin-sidebar-backdrop {
          display: none;
        }
        .admin-sidebar-aside {
          width: 260px;
          min-width: 260px;
          background-color: #0F172A;
          color: #FFFFFF;
          min-height: 100vh;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #1E293B;
          z-index: 1001;
        }
        .admin-mobile-close-btn {
          display: none;
        }

        @media (max-width: 767px) {
          .admin-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            background-color: #0F172A;
            color: #FFFFFF;
            padding: 0 16px;
            z-index: 999;
            border-bottom: 1px solid #1E293B;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }

          .admin-sidebar-backdrop {
            display: ${isOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(4px);
            z-index: 1000;
          }

          .admin-sidebar-aside {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            height: 100vh;
            width: 280px;
            min-width: 280px;
            transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: ${isOpen ? '4px 0 24px rgba(0,0,0,0.4)' : 'none'};
          }

          .admin-mobile-close-btn {
            display: block;
          }
        }
      `}</style>

      {/* Top Header para Móviles */}
      <header className="admin-mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
            Go<span style={{ color: '#D4A853' }}>Travel</span>
          </span>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Admin
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
          style={{
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          {isOpen ? <X size={18} color="#D4A853" /> : <Menu size={18} color="#FFFFFF" />}
          <span>{isOpen ? 'Cerrar' : 'Menú'}</span>
        </button>
      </header>

      {/* Fondo oscuro para cerrar al hacer clic afuera */}
      <div className="admin-sidebar-backdrop" onClick={() => setIsOpen(false)} />

      {/* Menú Lateral (Drawer en Móvil / Sidebar en Desktop) */}
      <aside className="admin-sidebar-aside">
        <div>
          {/* Encabezado del Menú */}
          <div style={{ marginBottom: '36px', padding: '0 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
                Go<span style={{ color: '#D4A853' }}>Travel</span>
              </span>
              <span style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Panel de Control
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="admin-mobile-close-btn"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#94A3B8',
                padding: '4px',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Opciones de Navegación */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
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

        {/* Acciones del Pie del Menú */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px', borderTop: '1px solid #1E293B' }}>
          <Link
            href="/es"
            target="_blank"
            onClick={handleNavClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              fontSize: '14px',
              color: '#94A3B8',
              fontWeight: '600',
              textDecoration: 'none',
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
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
