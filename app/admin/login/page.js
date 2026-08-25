'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Credenciales válidas
  const VALID_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@toursgotravel.com';
  const VALID_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123456';

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard automáticamente
    const token = localStorage.getItem('gotravel_admin_token');
    if (token === 'authenticated') {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const inputEmail = email.trim().toLowerCase();
    const isEmailValid = inputEmail === VALID_EMAIL.toLowerCase() || inputEmail === 'admin@gotravel.com.mx';

    setTimeout(() => {
      if (isEmailValid && password === VALID_PASSWORD) {
        localStorage.setItem('gotravel_admin_token', 'authenticated');
        document.cookie = "gotravel_admin_token=authenticated; path=/; max-age=86400;";
        router.push('/admin/dashboard');
      } else {
        setLoading(false);
        setError('Correo o contraseña incorrectos. Por favor intenta de nuevo.');
      }
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#F0FDF4',
              color: '#1B5E3B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
            Panel de Administración
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Ingresa tus credenciales para administrar GoTravel
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#991B1B',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
              Correo Electrónico
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#1B5E3B',
              color: '#FFFFFF',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              marginTop: '10px',
              boxShadow: '0 6px 20px rgba(27, 94, 59, 0.3)',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
