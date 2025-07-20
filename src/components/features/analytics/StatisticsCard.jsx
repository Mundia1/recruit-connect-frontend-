import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../ui/Card';

const StatisticsCard = ({
  title,
  value,
  subtitle = null,
  trend = null,
  icon: Icon = null,
  className = '',
  iconBgColor = 'bg-[var(--green-light)]',
  iconColor = 'text-[var(--green-darker)]',
  valueSize = 'text-[var(--text-3xl)]',
  loading = false,
  onClick = null
}) => {
  const isPositive = trend && (typeof trend === 'string' ? trend.startsWith('+') : trend > 0);
  const isNegative = trend && (typeof trend === 'string' ? trend.startsWith('-') : trend < 0);

  const renderTrend = () => {
    if (trend === null || trend === undefined) return null;

    let displayTrend = trend;
    if (typeof trend === 'number') {
      displayTrend = trend > 0 ? `+${trend}%` : `${trend}%`;
    }

    return (
      <span className={`text-[var(--text-sm)] font-medium ${
        isPositive ? 'text-[var(--green-primary)]' : isNegative ? 'text-red-600' : 'text-[var(--text-muted)]'
      }`}>
        {displayTrend}
      </span>
    );
  };

  return (
    <Card
      className={`p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-2 ${iconBgColor} rounded-[var(--radius-md)]`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
          )}
          <h3 className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">{title}</h3>
        </div>
        {renderTrend()}
      </div>

      <div className="space-y-1">
        {loading ? (
          <div className="h-8 bg-[var(--bg-secondary)] rounded-[var(--radius-md)] animate-pulse"></div>
        ) : (
          <p className={`${valueSize} font-bold text-[var(--text-primary)]`}>{value}</p>
        )}
        {subtitle && (
          <p className="text-[var(--text-sm)] text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  subtitle: PropTypes.string,
  trend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  icon: PropTypes.elementType,
  className: PropTypes.string,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string,
  valueSize: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

StatisticsCard.defaultProps = {
  loading: false
};

export default StatisticsCard;
