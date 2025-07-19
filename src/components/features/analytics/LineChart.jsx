import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ 
  title = "", 
  data = [],
  dataKey = 'value',
  stroke = '#3b82f6',
  showTitle = true,
  className = '',
  height = 300,
  showTooltip = true,
  showGrid = true
}) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6 shadow-sm ${className}`}>
      {showTitle && title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
      )}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
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
            {showTooltip && (
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            )}
            <Line 
              type="monotone" 
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
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

LineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    [PropTypes.string]: PropTypes.number
  })),
  dataKey: PropTypes.string,
  stroke: PropTypes.string,
  showTitle: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.number,
  showTooltip: PropTypes.bool,
  showGrid: PropTypes.bool
};

LineChart.defaultProps = {
  showTitle: true,
  showTooltip: true,
  showGrid: true
};

export default LineChart;