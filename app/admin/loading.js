import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminLoading() {
  return (
    <div style={{ padding: '80px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <LoadingSpinner text="Cargando panel de administración GoTravel..." />
    </div>
  );
}
