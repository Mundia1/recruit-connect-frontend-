import React from 'react';

const StatisticsCard = ({ 
  title, 
  value, 
  subtitle = null, 
  trend = null, 
  icon: Icon = null 
}) => {
  const isPositive = trend && trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 bg-green-50 rounded-lg">
              <Icon className="w-5 h-5 text-green-600" />
            </div>
          )}
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        </div>
        {trend && (
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {subtitle && (
          <p className="text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;