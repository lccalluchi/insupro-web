import { createContext, useContext, useState, ReactNode } from 'react';
import { sucursalesMock, Sucursal } from '../data/insumopro-mock';

interface SucursalContextType {
  sucursalSeleccionada: number | null; // null = todas las sucursales
  setSucursalSeleccionada: (sucursalId: number | null) => void;
  sucursales: Sucursal[];
  getSucursalById: (id: number) => Sucursal | undefined;
}

const SucursalContext = createContext<SucursalContextType | undefined>(undefined);

export function SucursalProvider({ children, usuarioSucursalId }: { children: ReactNode; usuarioSucursalId: number | null }) {
  // Si el usuario tiene sucursalId asignada, esa es su sucursal por defecto
  // Si es null (Gerente), puede ver todas
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<number | null>(
    usuarioSucursalId
  );

  const getSucursalById = (id: number) => sucursalesMock.find(s => s.id === id);

  return (
    <SucursalContext.Provider
      value={{
        sucursalSeleccionada,
        setSucursalSeleccionada,
        sucursales: sucursalesMock,
        getSucursalById,
      }}
    >
      {children}
    </SucursalContext.Provider>
  );
}

export function useSucursal() {
  const context = useContext(SucursalContext);
  if (!context) {
    throw new Error('useSucursal debe usarse dentro de SucursalProvider');
  }
  return context;
}
