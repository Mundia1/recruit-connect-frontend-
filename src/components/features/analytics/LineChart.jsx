import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ 
  title = "Job Views Over Time", 
  data = [
    { name: 'Jan', views: 820 },
    { name: 'Feb', views: 932 },
    { name: 'Mar', views: 1045 },
    { name: 'Apr', views: 1180 },
    { name: 'May', views: 1290 },
    { name: 'Jun', views: 1394 },
  ],
  trend = "+8%"
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
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Views"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total Views</span>
          <span className="font-medium text-slate-900">
            {data.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LineChart;