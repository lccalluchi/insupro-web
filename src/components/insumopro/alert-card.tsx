import { AlertTriangle, TrendingDown } from 'lucide-react';

interface AlertCardProps {
  type: 'danger' | 'warning';
  title: string;
  message: string;
  time: string;
  stockSistema?: number;
  conteoFisico?: number;
}

export function AlertCard({ type, title, message, time, stockSistema, conteoFisico }: AlertCardProps) {
  const isDanger = type === 'danger';
  const hasMerma = stockSistema && conteoFisico && (stockSistema > conteoFisico);

  return (
    <div
      className={`flex flex-col p-3 rounded border transition-all hover:shadow-md ${
        isDanger
          ? 'bg-red-50 border-red-100 hover:bg-red-100'
          : 'bg-yellow-50 border-yellow-100 hover:bg-yellow-100'
      }`}
    >
      <div className="flex items-start">
        {isDanger ? (
          <AlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20} />
        ) : (
          <TrendingDown className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={20} />
        )}
        <div className="flex-1">
          <h4 className="font-bold text-sm text-gray-800">{title}</h4>
          <p className={`text-xs ${isDanger ? 'text-red-600' : 'text-yellow-600'}`}>
            {message}
          </p>
        </div>
        <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">{time}</span>
      </div>

      {/* Stock físico visible */}
      {stockSistema !== undefined && conteoFisico !== undefined && (
        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
          <div className="flex gap-3">
            <span className="text-gray-600">
              Sistema: <span className="font-semibold text-gray-800">{stockSistema} kg</span>
            </span>
            <span className="text-gray-600">
              Físico: <span className="font-semibold text-gray-800">{conteoFisico} kg</span>
            </span>
          </div>
          {hasMerma && (
            <span className="font-bold text-red-600">
              -{(stockSistema - conteoFisico).toFixed(1)} kg
            </span>
          )}
        </div>
      )}
    </div>
  );
}
