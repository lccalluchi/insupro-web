import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInsumoProAuth } from '../../context/insumopro-auth-context';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/insumopro/login');
  };

  if (!usuario) return null;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 flex-shrink-0">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
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
