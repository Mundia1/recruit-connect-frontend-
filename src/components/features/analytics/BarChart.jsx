import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChart = ({ 
  title = "Job Applications Over Time", 
  data = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 78 },
    { name: 'Mar', applications: 92 },
    { name: 'Apr', applications: 88 },
    { name: 'May', applications: 105 },
    { name: 'Jun', applications: 120 },
  ],
  trend = "+15%"
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500">This month</span>
          <span className="text-sm font-medium text-green-600">{trend}</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Bar 
              dataKey="applications" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Applications"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total Applications</span>
          <span className="font-medium text-slate-900">
            {data.reduce((sum, item) => sum + item.applications, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;