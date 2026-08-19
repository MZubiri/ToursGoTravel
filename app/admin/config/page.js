'use client';
import { useState } from 'react';
import { INITIAL_CONFIG } from '@/lib/demo-data';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminConfigPage() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
          Configuración General
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B' }}>
          Actualiza el número de WhatsApp, teléfono de contacto y enlaces oficiales
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '36px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F0FDF4', color: '#1B5E3B', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600', fontSize: '14px' }}>
            <CheckCircle2 size={18} />
            <span>Configuración guardada exitosamente.</span>
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
              value={config.whatsappNumber}
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
              value={config.email}
              onChange={(e) => setConfig({ ...config, email: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Teléfono de Oficina
            </label>
            <input
              type="text"
              required
              value={config.phone}
              onChange={(e) => setConfig({ ...config, phone: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Instagram URL
            </label>
            <input
              type="url"
              value={config.socialMedia.instagram}
              onChange={(e) => setConfig({ ...config, socialMedia: { ...config.socialMedia, instagram: e.target.value } })}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '15px' }}
            />
          </div>

          <button
            type="submit"
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
            }}
          >
            <Save size={18} />
            <span>Guardar Cambios</span>
          </button>
        </form>
      </div>
    </div>
  );
}
