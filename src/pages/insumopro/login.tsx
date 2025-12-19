import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, LogIn } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useInsumoProAuth } from '../../context/insumopro-auth-context';
import { usuariosMock } from '../../data/insumopro-mock';

export default function InsumoProLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useInsumoProAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);

    if (success) {
      navigate('/insumopro');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleDemoLogin = (userEmail: string) => {
    const user = usuariosMock.find((u) => u.email === userEmail);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
              <Box className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">InsumoPro</h1>
            <p className="text-gray-500 text-sm mt-1">Sistema de Gestión de Insumos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@insumopro.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="mt-1"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
              <LogIn className="mr-2" size={18} />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Usuarios de demostración:</p>
            <div className="grid gap-2">
              {usuariosMock.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleDemoLogin(user.email)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-800">
                        {user.nombre} {user.apellido}
                      </span>
                      <span className="text-gray-500 ml-2">({user.rol})</span>
                    </div>
                    <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.iniciales}
                    </div>
                  </div>
                  <div className="text-gray-500 mt-1">{user.email}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Contraseña para todos: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
