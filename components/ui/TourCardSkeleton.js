'use client';

export default function TourCardSkeleton({ count = 3 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', width: '100%' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Shimmer Image Placeholder */}
          <div className="skeleton-box" style={{ height: '240px', width: '100%' }} />

          {/* Body content */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="skeleton-box" style={{ width: '80px', height: '20px', borderRadius: '12px' }} />
              <div className="skeleton-box" style={{ width: '50px', height: '20px', borderRadius: '12px' }} />
            </div>

            <div className="skeleton-box" style={{ width: '90%', height: '26px', borderRadius: '8px' }} />
            <div className="skeleton-box" style={{ width: '75%', height: '26px', borderRadius: '8px' }} />

            <div className="skeleton-box" style={{ width: '100%', height: '40px', borderRadius: '8px', marginTop: '4px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F1F5F9', marginTop: 'auto' }}>
              <div className="skeleton-box" style={{ width: '90px', height: '28px', borderRadius: '8px' }} />
              <div className="skeleton-box" style={{ width: '110px', height: '38px', borderRadius: '20px' }} />
            </div>
          </div>
        </div>
      ))}

      <style jsx global>{`
        .skeleton-box {
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
