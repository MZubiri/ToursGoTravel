'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('gotravel_admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      router.replace('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  // Si estamos en la página de login, renderizar únicamente el formulario sin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Mientras verifica sesión en páginas protegidas
  if (loading || !isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>
        <span>Verificando acceso a la administración...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <AdminSidebar />
      <main style={{ flexGrow: 1, padding: '40px' }}>
        {children}
      </main>
    </div>
  );
}
