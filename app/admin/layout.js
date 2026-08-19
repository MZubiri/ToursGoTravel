import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Backoffice — GoTravel',
  description: 'Panel de administración de GoTravel',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <AdminSidebar />
      <main style={{ flexGrow: 1, padding: '40px' }}>
        {children}
      </main>
    </div>
  );
}
