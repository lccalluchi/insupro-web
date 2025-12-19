// Tipos
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: 'Gerente' | 'Chef' | 'Almacenero';
  iniciales: string;
}

export interface Insumo {
  id: number;
  nombre: string;
  categoria: 'Carnes' | 'Vegetales' | 'Granos' | 'Lácteos' | 'Especias' | 'Otros';
  stockSistema: number;
  unidad: 'kg' | 'L' | 'unidades';
  costoUnitario: number;
  stockMinimo: number;
  proveedor: string;
}

export interface Ingrediente {
  insumoId: number;
  cantidad: number;
  unidad: string;
}

export interface Receta {
  id: number;
  nombre: string;
  categoria: 'Entrada' | 'Plato Principal' | 'Postre' | 'Bebida';
  descripcion: string;
  ingredientes: Ingrediente[];
  porciones: number;
  tiempoPreparacion: number; // minutos
  costo: number;
  precio: number;
}

export interface Alerta {
  id: number;
  tipo: 'danger' | 'warning';
  titulo: string;
  mensaje: string;
  tiempo: string;
  insumoId?: number;
  stockSistema?: number;
  conteoFisico?: number;
}

export interface Reporte {
  id: number;
  fecha: string;
  usuarioId: number;
  insumos: {
    insumoId: number;
    stockSistema: number;
    conteoFisico: number;
    merma: number;
  }[];
}

// Usuarios Mock
export const usuariosMock: Usuario[] = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Mendoza',
    email: 'carlos@insumopro.com',
    password: '123456',
    rol: 'Gerente',
    iniciales: 'CM',
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'López',
    email: 'maria@insumopro.com',
    password: '123456',
    rol: 'Chef',
    iniciales: 'ML',
  },
  {
    id: 3,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@insumopro.com',
    password: '123456',
    rol: 'Almacenero',
    iniciales: 'JP',
  },
];

// Insumos Mock con conteo físico para simular mermas
export const insumosMock: Insumo[] = [
  // Carnes
  { id: 1, nombre: 'Lomo Fino', categoria: 'Carnes', stockSistema: 5.0, unidad: 'kg', costoUnitario: 45, stockMinimo: 3, proveedor: 'Carnes Premium SAC' },
  { id: 2, nombre: 'Pechuga de Pollo', categoria: 'Carnes', stockSistema: 12.0, unidad: 'kg', costoUnitario: 18, stockMinimo: 8, proveedor: 'Carnes Premium SAC' },
  { id: 3, nombre: 'Pescado Corvina', categoria: 'Carnes', stockSistema: 9.0, unidad: 'kg', costoUnitario: 25, stockMinimo: 5, proveedor: 'Pescados del Mar' },
  { id: 4, nombre: 'Carne Molida', categoria: 'Carnes', stockSistema: 10.0, unidad: 'kg', costoUnitario: 22, stockMinimo: 6, proveedor: 'Carnes Premium SAC' },

  // Vegetales
  { id: 5, nombre: 'Tomates', categoria: 'Vegetales', stockSistema: 6.0, unidad: 'kg', costoUnitario: 3.5, stockMinimo: 4, proveedor: 'Agromarket Perú' },
  { id: 6, nombre: 'Cebolla Roja', categoria: 'Vegetales', stockSistema: 2.0, unidad: 'kg', costoUnitario: 2.5, stockMinimo: 5, proveedor: 'Agromarket Perú' },
  { id: 7, nombre: 'Papa Blanca', categoria: 'Vegetales', stockSistema: 15.0, unidad: 'kg', costoUnitario: 1.8, stockMinimo: 10, proveedor: 'Agromarket Perú' },
  { id: 8, nombre: 'Lechuga', categoria: 'Vegetales', stockSistema: 4.5, unidad: 'kg', costoUnitario: 2.2, stockMinimo: 3, proveedor: 'Agromarket Perú' },
  { id: 9, nombre: 'Zanahoria', categoria: 'Vegetales', stockSistema: 7.0, unidad: 'kg', costoUnitario: 1.5, stockMinimo: 5, proveedor: 'Agromarket Perú' },
  { id: 10, nombre: 'Ají Amarillo', categoria: 'Vegetales', stockSistema: 3.5, unidad: 'kg', costoUnitario: 4.5, stockMinimo: 2, proveedor: 'Agromarket Perú' },

  // Granos
  { id: 11, nombre: 'Arroz', categoria: 'Granos', stockSistema: 25.0, unidad: 'kg', costoUnitario: 3.2, stockMinimo: 15, proveedor: 'Distribuidora Global' },
  { id: 12, nombre: 'Frijoles', categoria: 'Granos', stockSistema: 8.0, unidad: 'kg', costoUnitario: 5.5, stockMinimo: 5, proveedor: 'Distribuidora Global' },
  { id: 13, nombre: 'Quinua', categoria: 'Granos', stockSistema: 5.5, unidad: 'kg', costoUnitario: 12, stockMinimo: 3, proveedor: 'Distribuidora Global' },

  // Lácteos
  { id: 14, nombre: 'Leche', categoria: 'Lácteos', stockSistema: 20.0, unidad: 'L', costoUnitario: 3.8, stockMinimo: 12, proveedor: 'Lácteos del Valle' },
  { id: 15, nombre: 'Queso Fresco', categoria: 'Lácteos', stockSistema: 6.0, unidad: 'kg', costoUnitario: 15, stockMinimo: 4, proveedor: 'Lácteos del Valle' },
  { id: 16, nombre: 'Mantequilla', categoria: 'Lácteos', stockSistema: 4.0, unidad: 'kg', costoUnitario: 18, stockMinimo: 2, proveedor: 'Lácteos del Valle' },

  // Especias y Otros
  { id: 17, nombre: 'Sal', categoria: 'Especias', stockSistema: 10.0, unidad: 'kg', costoUnitario: 1.2, stockMinimo: 5, proveedor: 'Distribuidora Global' },
  { id: 18, nombre: 'Pimienta', categoria: 'Especias', stockSistema: 2.5, unidad: 'kg', costoUnitario: 25, stockMinimo: 1, proveedor: 'Distribuidora Global' },
  { id: 19, nombre: 'Ajo', categoria: 'Especias', stockSistema: 3.0, unidad: 'kg', costoUnitario: 8, stockMinimo: 2, proveedor: 'Agromarket Perú' },
  { id: 20, nombre: 'Aceite Vegetal', categoria: 'Otros', stockSistema: 15.0, unidad: 'L', costoUnitario: 12, stockMinimo: 8, proveedor: 'Distribuidora Global' },
];

// Recetas Mock
export const recetasMock: Receta[] = [
  {
    id: 1,
    nombre: 'Lomo Saltado Clásico',
    categoria: 'Plato Principal',
    descripcion: 'Tradicional plato peruano con lomo de res, papas fritas y arroz',
    ingredientes: [
      { insumoId: 1, cantidad: 0.3, unidad: 'kg' },
      { insumoId: 5, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 6, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 7, cantidad: 0.2, unidad: 'kg' },
      { insumoId: 11, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 20, cantidad: 0.05, unidad: 'L' },
    ],
    porciones: 1,
    tiempoPreparacion: 25,
    costo: 18.5,
    precio: 35,
  },
  {
    id: 2,
    nombre: 'Ceviche Tradicional',
    categoria: 'Entrada',
    descripcion: 'Pescado fresco marinado en limón con cebolla, ají y camote',
    ingredientes: [
      { insumoId: 3, cantidad: 0.2, unidad: 'kg' },
      { insumoId: 6, cantidad: 0.08, unidad: 'kg' },
      { insumoId: 10, cantidad: 0.02, unidad: 'kg' },
      { insumoId: 8, cantidad: 0.05, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 20,
    costo: 8.5,
    precio: 22,
  },
  {
    id: 3,
    nombre: 'Arroz con Pollo',
    categoria: 'Plato Principal',
    descripcion: 'Arroz verde con pollo tierno y vegetales',
    ingredientes: [
      { insumoId: 2, cantidad: 0.25, unidad: 'kg' },
      { insumoId: 11, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 7, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 9, cantidad: 0.05, unidad: 'kg' },
      { insumoId: 19, cantidad: 0.01, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 35,
    costo: 10.2,
    precio: 25,
  },
  {
    id: 4,
    nombre: 'Causa Limeña',
    categoria: 'Entrada',
    descripcion: 'Papa amarilla con ají, limón y relleno de pollo o atún',
    ingredientes: [
      { insumoId: 7, cantidad: 0.3, unidad: 'kg' },
      { insumoId: 10, cantidad: 0.02, unidad: 'kg' },
      { insumoId: 2, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 8, cantidad: 0.05, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 30,
    costo: 6.8,
    precio: 18,
  },
  {
    id: 5,
    nombre: 'Ají de Gallina',
    categoria: 'Plato Principal',
    descripcion: 'Pollo desmenuzado en crema de ají amarillo',
    ingredientes: [
      { insumoId: 2, cantidad: 0.2, unidad: 'kg' },
      { insumoId: 10, cantidad: 0.05, unidad: 'kg' },
      { insumoId: 14, cantidad: 0.1, unidad: 'L' },
      { insumoId: 11, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 7, cantidad: 0.1, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 40,
    costo: 9.5,
    precio: 24,
  },
  {
    id: 6,
    nombre: 'Seco de Carne',
    categoria: 'Plato Principal',
    descripcion: 'Carne estofada con cilantro y frijoles',
    ingredientes: [
      { insumoId: 4, cantidad: 0.25, unidad: 'kg' },
      { insumoId: 12, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 11, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 6, cantidad: 0.05, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 50,
    costo: 11.5,
    precio: 28,
  },
  {
    id: 7,
    nombre: 'Ensalada Fresca',
    categoria: 'Entrada',
    descripcion: 'Mix de vegetales frescos con vinagreta',
    ingredientes: [
      { insumoId: 8, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 5, cantidad: 0.08, unidad: 'kg' },
      { insumoId: 9, cantidad: 0.05, unidad: 'kg' },
      { insumoId: 20, cantidad: 0.02, unidad: 'L' },
    ],
    porciones: 1,
    tiempoPreparacion: 10,
    costo: 2.5,
    precio: 12,
  },
  {
    id: 8,
    nombre: 'Tacu Tacu',
    categoria: 'Plato Principal',
    descripcion: 'Mezcla de arroz y frijoles frita',
    ingredientes: [
      { insumoId: 11, cantidad: 0.15, unidad: 'kg' },
      { insumoId: 12, cantidad: 0.1, unidad: 'kg' },
      { insumoId: 20, cantidad: 0.03, unidad: 'L' },
      { insumoId: 19, cantidad: 0.01, unidad: 'kg' },
    ],
    porciones: 1,
    tiempoPreparacion: 25,
    costo: 4.2,
    precio: 16,
  },
];

// Datos de conteo físico (para calcular mermas y mostrar en alertas)
export const conteoFisicoMock: Record<number, number> = {
  1: 4.2,   // Lomo Fino: Sistema 5.0, Físico 4.2 = Merma 0.8kg (800g)
  3: 8.5,   // Pescado Corvina: Sistema 9.0, Físico 8.5 = Merma 0.5kg (500g)
  6: 2.0,   // Cebolla Roja: Sistema 2.0, Físico 2.0 = Sin merma (pero stock bajo)
  10: 3.2,  // Ají Amarillo: Sistema 3.5, Físico 3.2 = Merma 0.3kg (300g)
  15: 6.0,  // Queso Fresco: Sistema 6.0, Físico 6.0 = Sin merma (pero por vencer)
};

// Función para calcular mermas
export function calcularMermas() {
  return Object.entries(conteoFisicoMock).map(([insumoId, conteoFisico]) => {
    const insumo = insumosMock.find(i => i.id === parseInt(insumoId));
    if (!insumo) return null;

    const merma = insumo.stockSistema - conteoFisico;
    return {
      insumoId: parseInt(insumoId),
      nombre: insumo.nombre,
      stockSistema: insumo.stockSistema,
      conteoFisico,
      merma,
      valorMerma: merma * insumo.costoUnitario,
    };
  }).filter(Boolean);
}

// Función para verificar stock bajo
export function verificarStockBajo() {
  return insumosMock.filter(insumo => insumo.stockSistema <= insumo.stockMinimo);
}

// Alertas Mock (generadas dinámicamente basadas en datos reales)
export const alertasMock: Alerta[] = [
  // Mermas detectadas
  {
    id: 1,
    tipo: 'danger',
    titulo: 'Lomo Fino',
    mensaje: 'Faltante detectado: 800g',
    tiempo: 'Hace 2h',
    insumoId: 1,
    stockSistema: 5.0,
    conteoFisico: 4.2,
  },
  {
    id: 4,
    tipo: 'danger',
    titulo: 'Pescado Corvina',
    mensaje: 'Merma detectada: 500g',
    tiempo: 'Hace 5h',
    insumoId: 3,
    stockSistema: 9.0,
    conteoFisico: 8.5,
  },
  {
    id: 6,
    tipo: 'danger',
    titulo: 'Ají Amarillo',
    mensaje: 'Merma detectada: 300g',
    tiempo: 'Hace 6h',
    insumoId: 10,
    stockSistema: 3.5,
    conteoFisico: 3.2,
  },
  // Stock bajo
  {
    id: 2,
    tipo: 'warning',
    titulo: 'Cebolla Roja',
    mensaje: 'Stock bajo: 2kg restantes (mínimo: 5kg)',
    tiempo: 'Hace 4h',
    insumoId: 6,
    stockSistema: 2.0,
    conteoFisico: 2.0,
  },
  {
    id: 3,
    tipo: 'warning',
    titulo: 'Queso Fresco',
    mensaje: 'Próximo a vencer en 3 días',
    tiempo: 'Hace 1 día',
    insumoId: 15,
    stockSistema: 6.0,
    conteoFisico: 6.0,
  },
];

// Reportes Mock - Historial de los últimos 7 días
export const reportesMock: Reporte[] = [
  {
    id: 1,
    fecha: '2025-12-18', // Hoy
    usuarioId: 3,
    insumos: [
      { insumoId: 1, stockSistema: 5.0, conteoFisico: 4.2, merma: 0.8 },
      { insumoId: 3, stockSistema: 9.0, conteoFisico: 8.5, merma: 0.5 },
      { insumoId: 10, stockSistema: 3.5, conteoFisico: 3.2, merma: 0.3 },
      { insumoId: 11, stockSistema: 25.0, conteoFisico: 24.8, merma: 0.2 },
    ],
  },
  {
    id: 2,
    fecha: '2025-12-17',
    usuarioId: 3,
    insumos: [
      { insumoId: 1, stockSistema: 6.0, conteoFisico: 5.5, merma: 0.5 },
      { insumoId: 2, stockSistema: 12.0, conteoFisico: 11.8, merma: 0.2 },
      { insumoId: 11, stockSistema: 27.0, conteoFisico: 26.5, merma: 0.5 },
    ],
  },
  {
    id: 3,
    fecha: '2025-12-16',
    usuarioId: 2,
    insumos: [
      { insumoId: 1, stockSistema: 7.0, conteoFisico: 6.2, merma: 0.8 },
      { insumoId: 3, stockSistema: 10.0, conteoFisico: 9.7, merma: 0.3 },
      { insumoId: 5, stockSistema: 6.0, conteoFisico: 5.9, merma: 0.1 },
    ],
  },
  {
    id: 4,
    fecha: '2025-12-15',
    usuarioId: 3,
    insumos: [
      { insumoId: 2, stockSistema: 13.0, conteoFisico: 12.5, merma: 0.5 },
      { insumoId: 11, stockSistema: 28.0, conteoFisico: 27.8, merma: 0.2 },
    ],
  },
  {
    id: 5,
    fecha: '2025-12-14',
    usuarioId: 3,
    insumos: [
      { insumoId: 1, stockSistema: 8.0, conteoFisico: 7.1, merma: 0.9 },
      { insumoId: 3, stockSistema: 11.0, conteoFisico: 10.3, merma: 0.7 },
      { insumoId: 10, stockSistema: 4.0, conteoFisico: 3.7, merma: 0.3 },
    ],
  },
  {
    id: 6,
    fecha: '2025-12-13',
    usuarioId: 2,
    insumos: [
      { insumoId: 1, stockSistema: 9.0, conteoFisico: 9.0, merma: 0 },
      { insumoId: 11, stockSistema: 30.0, conteoFisico: 29.5, merma: 0.5 },
    ],
  },
  {
    id: 7,
    fecha: '2025-12-12',
    usuarioId: 3,
    insumos: [
      { insumoId: 1, stockSistema: 10.0, conteoFisico: 9.3, merma: 0.7 },
      { insumoId: 2, stockSistema: 14.0, conteoFisico: 13.6, merma: 0.4 },
      { insumoId: 3, stockSistema: 12.0, conteoFisico: 11.5, merma: 0.5 },
    ],
  },
];

// Función para obtener reportes recientes
export function getReportesRecientes(limit: number = 7) {
  return reportesMock.slice(0, limit);
}

// Función para calcular tendencias de mermas
export function calcularTendenciasMermas(insumoId: number) {
  const reportesInsumo = reportesMock
    .map(reporte => ({
      fecha: reporte.fecha,
      merma: reporte.insumos.find(i => i.insumoId === insumoId)?.merma || 0
    }))
    .filter(r => r.merma > 0)
    .slice(0, 7);

  const totalMerma = reportesInsumo.reduce((acc, r) => acc + r.merma, 0);
  const promedio = reportesInsumo.length > 0 ? totalMerma / reportesInsumo.length : 0;

  return {
    reportes: reportesInsumo,
    totalMerma,
    promedio,
    diasConMerma: reportesInsumo.length
  };
}

// Función para obtener resumen semanal
export function getResumenSemanal() {
  const ultimos7Dias = reportesMock.slice(0, 7);

  const totalMermas = ultimos7Dias.reduce((acc, reporte) => {
    const mermaReporte = reporte.insumos.reduce((sum, i) => sum + i.merma, 0);
    return acc + mermaReporte;
  }, 0);

  const productosMasAfectados = new Map<number, number>();
  ultimos7Dias.forEach(reporte => {
    reporte.insumos.forEach(i => {
      if (i.merma > 0) {
        productosMasAfectados.set(
          i.insumoId,
          (productosMasAfectados.get(i.insumoId) || 0) + i.merma
        );
      }
    });
  });

  const top3Productos = Array.from(productosMasAfectados.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([insumoId, mermaTotal]) => ({
      insumo: insumosMock.find(i => i.id === insumoId),
      mermaTotal
    }));

  return {
    diasReportados: ultimos7Dias.length,
    totalMermas,
    promedioMermasDiarias: totalMermas / ultimos7Dias.length,
    top3Productos
  };
}
