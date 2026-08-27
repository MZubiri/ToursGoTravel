'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function TourGallery({ images = [], title = 'Tour' }) {
  const galleryImages = images.length > 0 ? images.slice(0, 5) : ['/images/hero.jpg'];
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Swipe táctil para carrusel móvil
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveMobileIdx((prev) => (prev + 1) % galleryImages.length);
      } else {
        setActiveMobileIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const nextMobile = () => setActiveMobileIdx((prev) => (prev + 1) % galleryImages.length);
  const prevMobile = () => setActiveMobileIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div style={{ marginBottom: '40px' }}>
      <style jsx global>{`
        .tour-gallery-desktop {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 12px;
          border-radius: 20px;
          overflow: hidden;
          background-color: #0F172A;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .tour-gallery-mobile {
          display: none;
        }

        @media (max-width: 767px) {
          .tour-gallery-desktop {
            display: none;
          }
          .tour-gallery-mobile {
            display: block;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            background-color: #0F172A;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          }
        }
      `}</style>

      {/* VISTA PC: Galería de 5 Fotos (1 Principal + 4 Miniaturas) sin recortar */}
      <div className="tour-gallery-desktop">
        {/* Foto Principal Destacada */}
        <div
          onClick={() => setLightboxIdx(galleryImages.indexOf(selectedImage))}
          style={{
            position: 'relative',
            height: '460px',
            backgroundColor: '#0F172A',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={selectedImage}
            alt={title}
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: '600',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Maximize2 size={14} color="#D4A853" />
            <span>Ver pantalla completa</span>
          </div>
        </div>

        {/* Cuadrícula de hasta 4 fotos secundarias */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: galleryImages.length > 2 ? '1fr 1fr' : '1fr',
            gridTemplateRows: galleryImages.length > 2 ? '1fr 1fr' : '1fr',
            gap: '8px',
            height: '460px',
          }}
        >
          {galleryImages.map((img, idx) => {
            const isSelected = img === selectedImage;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage(img);
                  setLightboxIdx(idx);
                }}
                style={{
                  position: 'relative',
                  height: '100%',
                  backgroundColor: '#0F172A',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  border: isSelected ? '3px solid #D4A853' : '1px solid #1E293B',
                  opacity: isSelected ? 1 : 0.85,
                  transition: 'all 0.2s ease',
                }}
              >
                <Image
                  src={img}
                  alt={`${title} foto ${idx + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* VISTA CELULAR: Carrusel Interactivo Deslizable sin recortar */}
      <div
        className="tour-gallery-mobile"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            height: '340px',
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxIdx(activeMobileIdx)}
        >
          <Image
            src={galleryImages[activeMobileIdx]}
            alt={`${title} foto ${activeMobileIdx + 1}`}
            fill
            priority
            style={{ objectFit: 'contain' }}
          />

          {/* Insignia de Contador */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              color: '#FFFFFF',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {activeMobileIdx + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Botones Anteriores / Siguientes en Móvil */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevMobile}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextMobile}
              aria-label="Siguiente imagen"
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Puntos Indicadores del Carrusel */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMobileIdx(i)}
                  style={{
                    width: activeMobileIdx === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: activeMobileIdx === i ? '#D4A853' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL LIGHTBOX PANTALLA COMPLETA */}
      {lightboxIdx !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={26} />
          </button>

          {/* Imagen Fullscreen sin Recorte */}
          <div style={{ position: 'relative', width: '100%', height: '82vh', maxWidth: '1200px' }}>
            <Image
              src={galleryImages[lightboxIdx]}
              alt={`${title} vista completa`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Navegación Lightbox */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() => setLightboxIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={() => setLightboxIdx((prev) => (prev + 1) % galleryImages.length)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
