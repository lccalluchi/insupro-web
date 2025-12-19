import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, usuariosMock } from '../data/insumopro-mock';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function InsumoProAuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('insumopro_usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const usuarioEncontrado = usuariosMock.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      localStorage.setItem('insumopro_usuario', JSON.stringify(usuarioEncontrado));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('insumopro_usuario');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        isAuthenticated: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useInsumoProAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useInsumoProAuth debe usarse dentro de InsumoProAuthProvider');
  }
  return context;
}
