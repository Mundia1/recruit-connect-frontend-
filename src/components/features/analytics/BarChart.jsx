import React from 'react';
import PropTypes from 'prop-types';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';

const BarChart = ({ 
  title = "", 
  data = [],
  dataKey = 'value',
  fill = 'var(--green-primary)',
  showTitle = true,
  className = '',
  height = 300
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
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
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
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-primary)', 
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)'
              }}
            />
            <Bar 
              dataKey={dataKey}
              fill={fill}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

BarChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    [PropTypes.string]: PropTypes.number
  })),
  dataKey: PropTypes.string,
  fill: PropTypes.string,
  showTitle: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.number
};

export default BarChart;
