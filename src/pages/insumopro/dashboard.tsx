import { useState } from 'react';
import { Box, AlertTriangle, TrendingUp, Clipboard } from 'lucide-react';
import { StatCard } from '../../components/insumopro/stat-card';
import { InventoryChart } from '../../components/insumopro/inventory-chart';
import { AlertCard } from '../../components/insumopro/alert-card';
import { HistorialReportes } from '../../components/insumopro/historial-reportes';
import { TendenciasMermas } from '../../components/insumopro/tendencias-mermas';
import {
  insumosMock,
  alertasMock,
  recetasMock,
  getReporteActual,
  getMermasReporteActual
} from '../../data/insumopro-mock';
import { formatCurrency, formatGrams, formatThousands } from '../../lib/format-utils';
import { useSucursal } from '../../context/SucursalContext';

export default function InsumoproDashboard() {
  const { sucursalSeleccionada } = useSucursal();
  const totalInsumos = insumosMock.length;

  // Obtener el reporte actual y sus mermas filtrado por sucursal
  const reporteActual = getReporteActual(sucursalSeleccionada);
  const mermasReporte = getMermasReporteActual(sucursalSeleccionada);
  const mermasDetectadas = mermasReporte.length;

  const valorInventario = insumosMock.reduce((acc, insumo) => {
    return acc + (insumo.stockSistema * insumo.costoUnitario);
  }, 0);

  const valorMermas = mermasReporte.reduce((acc: number, merma: any) => {
    return acc + (merma?.valorMerma || 0);
  }, 0);

  const alertasRecientes = alertasMock.slice(0, 5);

  // Estado para el producto seleccionado (por defecto, la primera merma)
  const [selectedInsumoId, setSelectedInsumoId] = useState<number | null>(
    mermasReporte.length > 0 && mermasReporte[0] ? (mermasReporte[0] as any).insumoId : null
  );

  // Obtener datos del producto seleccionado del reporte actual
  const selectedInsumo = insumosMock.find(i => i.id === selectedInsumoId);
  const selectedItemReporte = reporteActual.insumos.find(i => i.insumoId === selectedInsumoId);
  const selectedConteo = selectedItemReporte?.conteoFisico || null;

  // Manejar click en alerta (ahora todas son clickeables)
  const handleAlertClick = (insumoId?: number) => {
    if (insumoId) {
      setSelectedInsumoId(insumoId);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Insumos"
          value={totalInsumos}
          icon={Box}
          trend={{ value: '12 vs. ayer', type: 'up', color: 'green' }}
        />
        <StatCard
          title="Mermas Detectadas"
          value={mermasDetectadas}
          icon={AlertTriangle}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          trend={{ value: `${formatCurrency(valorMermas)} perdidos`, type: 'down', color: 'red' }}
          alertBorder
        />
        <StatCard
          title="Valor Inventario"
          value={formatThousands(valorInventario)}
          icon={TrendingUp}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Recetas Activas"
          value={recetasMock.length}
          icon={Clipboard}
        />
      </div>

      {/* Gráfico de comparación del producto seleccionado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {selectedInsumo && selectedConteo !== null && (
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Análisis de Inventario
              </h3>
              <p className="text-sm text-gray-500">
                Haz clic en una alerta para ver su comparación
              </p>
            </div>
            <InventoryChart
              productName={selectedInsumo.nombre}
              systemStock={selectedInsumo.stockSistema}
              physicalCount={selectedConteo}
            />
          </div>
        )}

        {/* Alertas recientes - clickeables */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Alertas Recientes ({alertasRecientes.length})
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Haz clic en una alerta para ver su gráfico
          </p>
          <div className="space-y-3">
            {alertasRecientes.map((alerta) => {
              const isSelected = alerta.insumoId === selectedInsumoId;

              return (
                <div
                  key={alerta.id}
                  onClick={() => handleAlertClick(alerta.insumoId)}
                  className={`transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-green-500 scale-105'
                      : ''
                  }`}
                >
                  <AlertCard
                    type={alerta.tipo}
                    title={alerta.titulo}
                    message={alerta.mensaje}
                    time={alerta.tiempo}
                    stockSistema={alerta.stockSistema}
                    conteoFisico={alerta.conteoFisico}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resumen de mermas detectadas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Resumen Detallado de Todas las Mermas ({mermasDetectadas})
        </h3>

        {/* Tabla de mermas */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Producto</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Stock Sistema</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Conteo Físico</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Merma</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Valor Perdido</th>
              </tr>
            </thead>
            <tbody>
              {mermasReporte
                .sort((a: any, b: any) => b.valorMerma - a.valorMerma)
                .map((merma: any, index: number) => (
                  <tr key={merma.insumoId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-800">{merma.nombre}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {merma.stockSistema} kg
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {merma.conteoFisico} kg
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-red-600">
                      {formatGrams(merma.merma * 1000)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-bold text-red-600">
                      {formatCurrency(merma.valorMerma)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td colSpan={4} className="py-3 px-4 text-sm text-gray-800">
                  Total
                </td>
                <td className="py-3 px-4 text-right text-sm text-red-600">
                  {formatGrams(
                    mermasReporte.reduce((acc: number, m: any) => acc + m.merma * 1000, 0)
                  )}
                </td>
                <td className="py-3 px-4 text-right text-lg text-red-600">
                  {formatCurrency(valorMermas)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Historial y Tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <HistorialReportes />
        <TendenciasMermas />
      </div>

      {/* Sección adicional: Insumos por categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Insumos por Categoría</h3>
          <div className="space-y-3">
            {['Carnes', 'Vegetales', 'Granos', 'Lácteos', 'Especias'].map((categoria) => {
              const count = insumosMock.filter((i) => i.categoria === categoria).length;
              const percentage = (count / totalInsumos) * 100;
              return (
                <div key={categoria}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{categoria}</span>
                    <span className="font-medium text-gray-800">{count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Top 5 Recetas Rentables</h3>
          <div className="space-y-3">
            {recetasMock
              .sort((a, b) => (b.precio - b.costo) - (a.precio - a.costo))
              .slice(0, 5)
              .map((receta, index) => {
                const ganancia = receta.precio - receta.costo;
                const margen = (ganancia / receta.precio) * 100;
                return (
                  <div
                    key={receta.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{receta.nombre}</p>
                        <p className="text-xs text-gray-500">{receta.categoria}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-sm">
                        {formatCurrency(ganancia)}
                      </p>
                      <p className="text-xs text-gray-500">{Math.round(margen)}% margen</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
