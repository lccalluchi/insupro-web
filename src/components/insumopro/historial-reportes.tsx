import { Calendar, TrendingDown, User } from 'lucide-react';
import { getReportesRecientes, usuariosMock, insumosMock } from '../../data/insumopro-mock';
import { formatCurrency, formatGrams } from '../../lib/format-utils';
import { useSucursal } from '../../context/SucursalContext';

export function HistorialReportes() {
  const { sucursalSeleccionada } = useSucursal();
  const reportesRecientes = getReportesRecientes(5, sucursalSeleccionada);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        Historial de Reportes Diarios
      </h3>

      <div className="space-y-4">
        {reportesRecientes.map((reporte) => {
          const usuario = usuariosMock.find(u => u.id === reporte.usuarioId);
          const totalMerma = reporte.insumos.reduce((acc, i) => acc + i.merma, 0);
          const valorMerma = reporte.insumos.reduce((acc, i) => {
            const insumo = insumosMock.find(ins => ins.id === i.insumoId);
            return acc + (i.merma * (insumo?.costoUnitario || 0));
          }, 0);

          return (
            <div
              key={reporte.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all"
            >
              {/* Header del reporte */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-500" size={16} />
                  <span className="font-semibold text-gray-800">{reporte.fecha}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={14} />
                  <span>{usuario?.nombre} {usuario?.apellido}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {usuario?.rol}
                  </span>
                </div>
              </div>

              {/* Resumen del reporte */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Productos</p>
                  <p className="font-bold text-gray-800">{reporte.insumos.length}</p>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <p className="text-xs text-gray-500">Merma Total</p>
                  <p className="font-bold text-red-600">{formatGrams(totalMerma * 1000)}</p>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <p className="text-xs text-gray-500">Valor Perdido</p>
                  <p className="font-bold text-red-600">{formatCurrency(valorMerma)}</p>
                </div>
              </div>

              {/* Detalles de mermas */}
              {reporte.insumos.filter(i => i.merma > 0).length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <TrendingDown size={12} />
                    Productos con merma:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reporte.insumos
                      .filter(i => i.merma > 0)
                      .map((item, idx) => {
                        const insumo = insumosMock.find(ins => ins.id === item.insumoId);
                        return (
                          <span
                            key={idx}
                            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
                          >
                            {insumo?.nombre}: {formatGrams(item.merma * 1000)}
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {reportesRecientes.length >= 5 && (
        <button className="mt-4 w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
          Ver todos los reportes
        </button>
      )}
    </div>
  );
}
