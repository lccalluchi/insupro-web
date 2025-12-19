import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    type: 'up' | 'down';
    color: 'green' | 'red';
  };
  alertBorder?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
  trend,
  alertBorder = false,
}: StatCardProps) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden`}>
      {alertBorder && <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>}
      <div className="flex justify-between">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase">{title}</p>
          <h3
            className={`text-3xl font-bold mt-2 ${
              alertBorder ? 'text-red-600' : 'text-gray-800'
            }`}
          >
            {value}
          </h3>
        </div>
        <div
          className={`p-3 ${iconBgColor} rounded ${iconColor} h-10 w-10 flex items-center justify-center`}
        >
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <p
          className={`text-xs mt-2 font-bold ${
            trend.color === 'green' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend.type === 'up' ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </div>
  );
}
