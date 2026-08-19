'use client';
import { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon, Plus } from 'lucide-react';

export default function ImageUploader({ images = [], onChange }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        onChange([...images, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const handleRemove = (indexToRemove) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', textTransform: 'uppercase' }}>
        Galeria de Imágenes del Tour
      </label>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? '2px dashed #1B5E3B' : '2px dashed #CBD5E1',
          backgroundColor: isDragging ? '#F0FDF4' : '#F8FAFC',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: '#1B5E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <UploadCloud size={24} />
        </div>

        <div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', display: 'block' }}>
            Arrastra tus imágenes aquí o <span style={{ color: '#1B5E3B', textDecoration: 'underline' }}>Haz Clic para Subir</span>
          </span>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            Soporta JPG, PNG, WEBP (Múltiples archivos permitidos)
          </span>
        </div>
      </div>

      {/* URL Input Fallback */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="O pega una URL directa de imagen (ej. /images/cabos.jpg o https://...)"
          style={{ flexGrow: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
        />
        <button
          type="button"
          onClick={handleAddUrl}
          style={{
            backgroundColor: '#1B5E3B',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Plus size={16} />
          <span>Agregar URL</span>
        </button>
      </div>

      {/* Image Thumbnails Previews */}
      {images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', marginTop: '8px' }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: '80px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                backgroundColor: '#0F172A',
              }}
            >
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
                title="Eliminar imagen"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
