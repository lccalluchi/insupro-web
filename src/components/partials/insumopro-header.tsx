import { Bell, LogOut, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInsumoProAuth } from '../../context/insumopro-auth-context';
import { useSucursal } from '../../context/SucursalContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface InsumoProHeaderProps {
  title: string;
}

export function InsumoProHeader({ title }: InsumoProHeaderProps) {
  const { usuario, logout } = useInsumoProAuth();
  const { sucursalSeleccionada, setSucursalSeleccionada, sucursales, getSucursalById } = useSucursal();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/insumopro/login');
  };

  if (!usuario) return null;

  // Solo los Gerentes (sucursalId === null) pueden cambiar de sucursal
  const puedeSeleccionarSucursal = usuario.sucursalId === null;
  const sucursalNombre = sucursalSeleccionada
    ? getSucursalById(sucursalSeleccionada)?.nombre
    : 'Todas las Sucursales';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        {/* Selector de sucursal (solo para Gerentes) */}
        {puedeSeleccionarSucursal && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                <Building2 size={16} />
                {sucursalNombre}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Seleccionar Sucursal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSucursalSeleccionada(null)}
                className="cursor-pointer"
              >
                <Building2 className="mr-2" size={16} />
                Todas las Sucursales
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {sucursales.map((sucursal) => (
                <DropdownMenuItem
                  key={sucursal.id}
                  onClick={() => setSucursalSeleccionada(sucursal.id)}
                  className="cursor-pointer"
                >
                  <Building2 className="mr-2" size={16} />
                  {sucursal.nombre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Indicador de sucursal (para no-Gerentes) */}
        {!puedeSeleccionarSucursal && usuario.sucursalId && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg text-sm font-medium text-green-700">
            <Building2 size={16} />
            {getSucursalById(usuario.sucursalId)?.nombre}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" size={20} />
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-800">
            {usuario.nombre} {usuario.apellido}
          </p>
          <p className="text-xs text-gray-500">{usuario.rol}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-green-600 transition-colors">
              {usuario.iniciales}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2" size={16} />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
