import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { getResumenSemanal, getReportesRecientes } from '../../data/insumopro-mock';
import { formatGrams } from '../../lib/format-utils';
import { useSucursal } from '../../context/SucursalContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TendenciasMermas() {
  const { sucursalSeleccionada } = useSucursal();
  const resumen = getResumenSemanal(sucursalSeleccionada);

  // Preparar datos para el gráfico de tendencias
  const ultimos7Reportes = getReportesRecientes(7, sucursalSeleccionada).reverse();
  const labels = ultimos7Reportes.map(r => {
    const fecha = new Date(r.fecha);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  });

  const mermasPorDia = ultimos7Reportes.map(reporte => {
    return reporte.insumos.reduce((acc, i) => acc + i.merma, 0);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Mermas Diarias (kg)',
        data: mermasPorDia,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        Tendencia de Mermas - Últimos 7 Días
      </h3>

      {/* Resumen semanal */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Total Mermas</p>
          <p className="font-bold text-gray-800">{formatGrams(resumen.totalMermas * 1000)}</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Promedio/Día</p>
          <p className="font-bold text-orange-600">
            {formatGrams(resumen.promedioMermasDiarias * 1000)}
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Días Reportados</p>
          <p className="font-bold text-blue-600">{resumen.diasReportados}</p>
        </div>
      </div>

      {/* Gráfico de línea */}
      <div className="h-48 mb-6">
        <Line data={data} options={options} />
      </div>

      {/* Top 3 productos más afectados */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">
          Productos Más Afectados (Última Semana)
        </h4>
        <div className="space-y-2">
          {resumen.top3Productos.map((item, index) => {
            if (!item.insumo) return null;
            const porcentaje = (item.mermaTotal / resumen.totalMermas) * 100;

            return (
              <div key={item.insumo.id} className="flex items-center gap-3">
                <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">
                      {item.insumo.nombre}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatGrams(item.mermaTotal * 1000)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
