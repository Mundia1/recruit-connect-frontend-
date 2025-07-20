import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';

const LineChart = ({ 
  title = "", 
  data = [],
  dataKey = 'value',
  stroke = 'var(--green-primary)',
  showTitle = true,
  className = '',
  height = 300,
  showTooltip = true,
  showGrid = true
}) => {
  return (
    <Card className={className}>
      {showTitle && title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-medium)' }}
              tickLine={{ stroke: 'var(--border-medium)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-medium)' }}
              tickLine={{ stroke: 'var(--border-medium)' }}
            />
            {showTooltip && (
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)'
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
      </CardContent>
    </Card>
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
