import { Outlet, useLocation } from 'react-router-dom';
import { InsumoProSidebar } from '../../components/partials/insumopro-sidebar';
import { InsumoProHeader } from '../../components/partials/insumopro-header';
import { InsumoProProtectedRoute } from './protected-route';

const pageTitles: Record<string, string> = {
  '/insumopro': 'Dashboard',
  '/insumopro/recetas': 'Mis Recetas',
  '/insumopro/reporte': 'Reporte Diario',
};

export default function InsumoProLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <InsumoProProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <InsumoProSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <InsumoProHeader title={title} />
          <main className="flex-1 overflow-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </InsumoProProtectedRoute>
  );
}
