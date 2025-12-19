import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ClipboardCheck, Settings, Box } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/insumopro', icon: LayoutDashboard },
  { name: 'Mis Recetas', path: '/insumopro/recetas', icon: UtensilsCrossed },
  { name: 'Reporte Diario', path: '/insumopro/reporte', icon: ClipboardCheck },
];

export function InsumoProSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10 h-screen">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Box className="text-green-500 text-2xl mr-3" size={32} />
        <span className="font-bold text-xl text-gray-800">InsumoPro</span>
      </div>

      <nav className="mt-6 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/insumopro'}
            className={({ isActive }) =>
              `w-full flex items-center px-6 py-4 text-gray-600 transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                  : 'hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="mr-3 w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-800 w-full transition-colors">
          <Settings className="mr-3" size={20} />
          Configuración
        </button>
      </div>
    </aside>
  );
}
