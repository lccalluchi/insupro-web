import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AlertCircle } from 'lucide-react';
import { formatGrams } from '../../lib/format-utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface InventoryChartProps {
  productName: string;
  systemStock: number;
  physicalCount: number;
}

export function InventoryChart({ productName, systemStock, physicalCount }: InventoryChartProps) {
  const difference = systemStock - physicalCount;
  const hasMerma = difference > 0;

  const data = {
    labels: ['Stock Sistema', 'Conteo Físico'],
    datasets: [
      {
        label: 'Cantidad (Kg)',
        data: [systemStock, physicalCount],
        backgroundColor: ['#9ca3af', '#3b82f6'],
        borderRadius: 8,
        barPercentage: 0.5,
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
        max: Math.max(systemStock, physicalCount) + 2,
      },
    },
  };

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{productName}</h3>
          <span className="text-sm font-normal text-gray-500">Comparación de inventario</span>
        </div>
        {hasMerma && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <AlertCircle size={14} /> Merma Detectada
          </span>
        )}
      </div>
      <div className="relative h-64">
        <Bar data={data} options={options} />
        {hasMerma && (
          <div className="absolute top-1/3 right-10 bg-red-600 text-white p-2 rounded shadow-lg text-center animate-bounce">
            <p className="text-xs font-bold">FALTANTE</p>
            <p className="text-lg font-bold">{formatGrams(difference * 1000)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
