import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner text="Cargando experiencias de GoTravel..." />
    </div>
  );
}
