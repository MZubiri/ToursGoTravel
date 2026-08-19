'use client';
import { useState, useEffect } from 'react';
import { INITIAL_CONFIG } from '@/lib/demo-data';
import { Save, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminConfigPage() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/config', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') {
            setConfig(prev => ({
              ...prev,
              ...data,
              socialMedia: {
                ...prev.socialMedia,
                ...(data.socialMedia || {})
              }
            }));
          }
        }
      } catch (err) {
        console.warn('Error loading config from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      }
    } catch (err) {
      console.error('Error saving config:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px', color: '#1B5E3B' }}>
        <Loader2 size={32} className="animate-spin" />
        <span style={{ fontWeight: '600', fontSize: '16px' }}>Cargando configuración...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
          Configuración General
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B' }}>
          Actualiza el número de WhatsApp, correo de contacto, teléfono de oficina y redes sociales
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '36px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F0FDF4', color: '#1B5E3B', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600', fontSize: '14px' }}>
            <CheckCircle2 size={18} />
            <span>Configuración guardada exitosamente en MySQL.</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Número de WhatsApp para Reservas
            </label>
            <input
              type="text"
              required
              value={config.whatsappNumber || ''}
              onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
              placeholder="+525551652314"
            />
            <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '4px' }}>
              Incluir código de país (Ej. +52 para México). Este número recibirá todos los chats de reservas.
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Correo de Contacto
            </label>
            <input
              type="email"
              required
              value={config.email || ''}
              onChange={(e) => setConfig({ ...config, email: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
              placeholder="contacto@toursgotravel.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Teléfono de Oficina
            </label>
            <input
              type="text"
              required
              value={config.phone || ''}
              onChange={(e) => setConfig({ ...config, phone: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
              placeholder="+52 (55) 5165-2314"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Instagram URL
            </label>
            <input
              type="url"
              value={config.socialMedia?.instagram || ''}
              onChange={(e) => setConfig({ ...config, socialMedia: { ...(config.socialMedia || {}), instagram: e.target.value } })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
              placeholder="https://instagram.com/toursgotravel"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#1B5E3B',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              marginTop: '12px',
              boxShadow: '0 6px 20px rgba(27, 94, 59, 0.25)',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
