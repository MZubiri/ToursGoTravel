'use client';
import { useState } from 'react';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { saveContactMessage } from '@/lib/firestore';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactForm({ locale, dict, config }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: 'Los Cabos',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await saveContactMessage({ ...formData, locale });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Text Info */}
          <div>
            <div style={{ color: '#1B5E3B', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Atención Personalizada
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#0F172A', marginBottom: '20px', lineHeight: 1.2 }}>
              {dict.contact.title}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6, marginBottom: '32px' }}>
              {dict.contact.subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0FDF4', color: '#1B5E3B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>WhatsApp 24/7</span>
                  <span style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A' }}>{config.whatsappNumber}</span>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppLink({ phone: config.whatsappNumber })}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '15px',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)',
              }}
            >
              <MessageCircle size={20} />
              <span>Contactar directamente por WhatsApp</span>
            </a>
          </div>

          {/* Right Form */}
          <div
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={56} color="#1B5E3B" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
                  ¡Mensaje Enviado!
                </h3>
                <p style={{ color: '#64748B', fontSize: '15px' }}>
                  {dict.contact.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                    {dict.contact.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                    {dict.contact.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                    {dict.contact.destination}
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="Los Cabos">Los Cabos</option>
                    <option value="Cancún">Cancún</option>
                    <option value="Puerto Vallarta">Puerto Vallarta</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                    {dict.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical',
                    }}
                    placeholder="Escribe tus dudas, fechas o cantidad de personas..."
                  />
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
                    boxShadow: '0 6px 20px rgba(27, 94, 59, 0.3)',
                    marginTop: '8px',
                  }}
                >
                  <Send size={18} />
                  <span>{loading ? 'Enviando...' : dict.contact.send}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
