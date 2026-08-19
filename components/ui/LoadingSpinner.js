'use client';

export default function LoadingSpinner({ text = 'Cargando experiencias...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        padding: '40px 20px',
        gap: '20px',
      }}
    >
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        {/* Outer glowing pulsing ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(27, 94, 59, 0.15)',
            borderTopColor: '#1B5E3B',
            animation: 'spin 0.9s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite',
          }}
        />
        {/* Inner reverse accent ring */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '3px solid rgba(212, 168, 83, 0.15)',
            borderBottomColor: '#D4A853',
            animation: 'spin-reverse 1.2s linear infinite',
          }}
        />
        {/* Center brand dot */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            backgroundColor: '#1B5E3B',
            borderRadius: '50%',
            animation: 'pulse-dot 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <span
        style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#1E293B',
          letterSpacing: '0.3px',
          animation: 'fade-pulse 1.8s ease-in-out infinite',
        }}
      >
        {text}
      </span>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(0.85); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
