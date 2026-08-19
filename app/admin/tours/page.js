'use client';
import { useState } from 'react';
import { DEMO_TOURS } from '@/lib/demo-data';
import { Plus, Edit3, Trash2, Globe, Check, X, Eye } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminToursPage() {
  const [toursList, setToursList] = useState(DEMO_TOURS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('es');

  // Initial empty form state matching all public tour fields
  const emptyForm = {
    destination: 'cabos',
    duration: '4 horas',
    maxCapacity: 12,
    priceAdult: 1500,
    priceChild: 950,
    rating: 5.0,
    reviewsCount: 1,
    status: 'published',
    images: ['/images/tour-snorkel.jpg', '/images/hero.jpg'],
    title: { es: '', en: '', fr: '', pt: '', de: '' },
    shortDescription: { es: '', en: '', fr: '', pt: '', de: '' },
    fullDescription: { es: '', en: '', fr: '', pt: '', de: '' },
    includes: { es: '', en: '', fr: '', pt: '', de: '' },
    excludes: { es: '', en: '', fr: '', pt: '', de: '' }
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleCreateNew = () => {
    setEditingTourId(null);
    setFormData(emptyForm);
    setActiveLangTab('es');
    setIsModalOpen(true);
  };

  const handleEdit = (tour) => {
    setEditingTourId(tour.id);
    setFormData({
      destination: tour.destination || 'cabos',
      duration: tour.duration || '4 horas',
      maxCapacity: tour.maxCapacity || 12,
      priceAdult: tour.priceAdult || 1500,
      priceChild: tour.priceChild || 950,
      rating: tour.rating || 5.0,
      reviewsCount: tour.reviewsCount || 1,
      status: tour.status || 'published',
      images: Array.isArray(tour.images) ? tour.images : [tour.images || '/images/hero.jpg'],
      title: {
        es: tour.title?.es || '',
        en: tour.title?.en || '',
        fr: tour.title?.fr || '',
        pt: tour.title?.pt || '',
        de: tour.title?.de || ''
      },
      shortDescription: {
        es: tour.shortDescription?.es || '',
        en: tour.shortDescription?.en || '',
        fr: tour.shortDescription?.fr || '',
        pt: tour.shortDescription?.pt || '',
        de: tour.shortDescription?.de || ''
      },
      fullDescription: {
        es: tour.fullDescription?.es || '',
        en: tour.fullDescription?.en || '',
        fr: tour.fullDescription?.fr || '',
        pt: tour.fullDescription?.pt || '',
        de: tour.fullDescription?.de || ''
      },
      includes: {
        es: Array.isArray(tour.includes?.es) ? tour.includes.es.join('\n') : tour.includes?.es || '',
        en: Array.isArray(tour.includes?.en) ? tour.includes.en.join('\n') : tour.includes?.en || '',
        fr: Array.isArray(tour.includes?.fr) ? tour.includes.fr.join('\n') : tour.includes?.fr || '',
        pt: Array.isArray(tour.includes?.pt) ? tour.includes.pt.join('\n') : tour.includes?.pt || '',
        de: Array.isArray(tour.includes?.de) ? tour.includes.de.join('\n') : tour.includes?.de || ''
      },
      excludes: {
        es: Array.isArray(tour.excludes?.es) ? tour.excludes.es.join('\n') : tour.excludes?.es || '',
        en: Array.isArray(tour.excludes?.en) ? tour.excludes.en.join('\n') : tour.excludes?.en || '',
        fr: Array.isArray(tour.excludes?.fr) ? tour.excludes.fr.join('\n') : tour.excludes?.fr || '',
        pt: Array.isArray(tour.excludes?.pt) ? tour.excludes.pt.join('\n') : tour.excludes?.pt || '',
        de: Array.isArray(tour.excludes?.de) ? tour.excludes.de.join('\n') : tour.excludes?.de || ''
      }
    });
    setActiveLangTab('es');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formatList = (str) => typeof str === 'string' ? str.split('\n').map(s => s.trim()).filter(Boolean) : str;

    const processedTour = {
      id: editingTourId || `tour-${Date.now()}`,
      slug: (formData.title.es || 'tour').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      destination: formData.destination,
      status: formData.status,
      duration: formData.duration,
      maxCapacity: Number(formData.maxCapacity),
      priceAdult: Number(formData.priceAdult),
      priceChild: Number(formData.priceChild),
      rating: Number(formData.rating),
      reviewsCount: Number(formData.reviewsCount),
      images: formData.images.length ? formData.images : ['/images/tour-snorkel.jpg'],
      title: formData.title,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      includes: {
        es: formatList(formData.includes.es),
        en: formatList(formData.includes.en),
        fr: formatList(formData.includes.fr),
        pt: formatList(formData.includes.pt),
        de: formatList(formData.includes.de)
      },
      excludes: {
        es: formatList(formData.excludes.es),
        en: formatList(formData.excludes.en),
        fr: formatList(formData.excludes.fr),
        pt: formatList(formData.excludes.pt),
        de: formatList(formData.excludes.de)
      }
    };

    if (editingTourId) {
      setToursList(toursList.map(t => t.id === editingTourId ? processedTour : t));
    } else {
      setToursList([processedTour, ...toursList]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este tour?')) {
      setToursList(toursList.filter(t => t.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setToursList(toursList.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'published' ? 'draft' : 'published' };
      }
      return t;
    }));
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
            Gestión de Tours (CRUD)
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B' }}>
            Crea, edita y administra los campos públicos y traducciones en los 5 idiomas
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1B5E3B',
            color: '#FFFFFF',
            padding: '12px 22px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '14px',
            boxShadow: '0 4px 14px rgba(27, 94, 59, 0.25)',
          }}
        >
          <Plus size={18} />
          <span>Crear Nuevo Tour</span>
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: '600' }}>
                <th style={{ padding: '14px 12px' }}>Tour</th>
                <th style={{ padding: '14px 12px' }}>Destino</th>
                <th style={{ padding: '14px 12px' }}>Precios (Adulto/Niño)</th>
                <th style={{ padding: '14px 12px' }}>Duración & Capacidad</th>
                <th style={{ padding: '14px 12px' }}>Traducciones</th>
                <th style={{ padding: '14px 12px' }}>Estado</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {toursList.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '15px', marginBottom: '2px' }}>
                      {t.title?.es || t.title?.en}
                    </div>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>/tours/{t.slug}</span>
                  </td>
                  <td style={{ padding: '16px 12px', color: '#475569', textTransform: 'capitalize', fontWeight: '600' }}>
                    {t.destination}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ fontWeight: '700', color: '#1B5E3B' }}>${t.priceAdult.toLocaleString()} MXN</div>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Niño: ${t.priceChild.toLocaleString()} MXN</span>
                  </td>
                  <td style={{ padding: '16px 12px', color: '#475569', fontSize: '13px' }}>
                    <div>⏱ {t.duration}</div>
                    <div>👥 Max {t.maxCapacity} paxs</div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['es', 'en', 'fr', 'pt', 'de'].map(lang => (
                        <span
                          key={lang}
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            backgroundColor: t.title?.[lang] ? '#F0FDF4' : '#F1F5F9',
                            color: t.title?.[lang] ? '#1B5E3B' : '#94A3B8',
                            textTransform: 'uppercase'
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <button
                      onClick={() => toggleStatus(t.id)}
                      style={{
                        backgroundColor: t.status === 'published' ? '#F0FDF4' : '#FEF2F2',
                        color: t.status === 'published' ? '#1B5E3B' : '#EF4444',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {t.status === 'published' ? 'Publicado' : 'Borrador'}
                    </button>
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(t)}
                        style={{ color: '#2563EB', padding: '8px', borderRadius: '8px', backgroundColor: '#EFF6FF' }}
                        title="Editar tour completo"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        style={{ color: '#EF4444', padding: '8px', borderRadius: '8px', backgroundColor: '#FEF2F2' }}
                        title="Eliminar tour"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A' }}>
                  {editingTourId ? 'Editar Tour' : 'Crear Nuevo Tour'}
                </h2>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Completa todos los datos públicos, imágenes y traducciones por idioma</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#64748B', padding: '4px' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Image Uploader Component (Drag & Drop + Local File Upload + Previews) */}
              <ImageUploader
                images={formData.images}
                onChange={(newImages) => setFormData({ ...formData, images: newImages })}
              />

              {/* Language Selector Tabs */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Pestañas de Idioma para Campos Traducibles
                </label>
                <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F8FAFC', padding: '6px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  {['es', 'en', 'fr', 'pt', 'de'].map(lang => (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => setActiveLangTab(lang)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        backgroundColor: activeLangTab === lang ? '#1B5E3B' : 'transparent',
                        color: activeLangTab === lang ? '#FFFFFF' : '#64748B',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {lang === 'es' ? '🇲🇽 ES' : lang === 'en' ? '🇺🇸 EN' : lang === 'fr' ? '🇫🇷 FR' : lang === 'pt' ? '🇧🇷 PT' : '🇩🇪 DE'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Localized Fields Section */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1B5E3B', textTransform: 'uppercase' }}>
                  Contenido en {activeLangTab.toUpperCase()}
                </h4>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Título del Tour ({activeLangTab.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    required={activeLangTab === 'es'}
                    value={formData.title[activeLangTab] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      title: { ...formData.title, [activeLangTab]: e.target.value }
                    })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    placeholder="Ej. Snorkel y Paseo al Arco de Los Cabos"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Descripción Breve ({activeLangTab.toUpperCase()}) — Para la tarjeta de catálogo
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription[activeLangTab] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      shortDescription: { ...formData.shortDescription, [activeLangTab]: e.target.value }
                    })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    placeholder="Resumen de 2 líneas para la tarjeta de catálogo..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Descripción Completa ({activeLangTab.toUpperCase()}) — Para la página de detalle
                  </label>
                  <textarea
                    rows={4}
                    value={formData.fullDescription[activeLangTab] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      fullDescription: { ...formData.fullDescription, [activeLangTab]: e.target.value }
                    })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    placeholder="Descripción detallada de la experiencia, paradas y actividades..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1B5E3B', marginBottom: '6px' }}>
                      Qué incluye (1 item por línea) ({activeLangTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={formData.includes[activeLangTab] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        includes: { ...formData.includes, [activeLangTab]: e.target.value }
                      })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '13px' }}
                      placeholder="Guía certificado&#10;Equipo de snorkel&#10;Barra libre"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#E63946', marginBottom: '6px' }}>
                      No incluye (1 item por línea) ({activeLangTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={formData.excludes[activeLangTab] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        excludes: { ...formData.excludes, [activeLangTab]: e.target.value }
                      })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '13px' }}
                      placeholder="Impuesto de muelle ($5 USD)&#10;Propinas"
                    />
                  </div>
                </div>

              </div>

              {/* General Non-Localized Fields Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Destino
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  >
                    <option value="cabos">Los Cabos</option>
                    <option value="cancun">Cancún</option>
                    <option value="vallarta">Puerto Vallarta</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Duración
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    placeholder="Ej. 3.5 horas"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Capacidad Máxima (Paxs)
                  </label>
                  <input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Precio Adulto (MXN)
                  </label>
                  <input
                    type="number"
                    value={formData.priceAdult}
                    onChange={(e) => setFormData({ ...formData, priceAdult: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Precio Niño (MXN)
                  </label>
                  <input
                    type="number"
                    value={formData.priceChild}
                    onChange={(e) => setFormData({ ...formData, priceChild: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Estado
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Borrador</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #CBD5E1', color: '#475569', fontWeight: '600' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 28px', borderRadius: '12px', backgroundColor: '#1B5E3B', color: '#FFFFFF', fontWeight: '700', boxShadow: '0 4px 14px rgba(27,94,59,0.3)' }}
                >
                  {editingTourId ? 'Guardar Cambios' : 'Crear Tour'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
