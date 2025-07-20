import React from 'react';
import PropTypes from 'prop-types';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-light)] rounded-[var(--radius-lg)] shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string,
};

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
));
CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
  className: PropTypes.string,
};

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-xl font-semibold leading-tight ${className}`}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';
CardTitle.propTypes = {
  className: PropTypes.string,
};

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-[var(--text-muted)] ${className}`} {...props} />
));
CardDescription.displayName = 'CardDescription';
CardDescription.propTypes = {
  className: PropTypes.string,
};

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = 'CardContent';
CardContent.propTypes = {
  className: PropTypes.string,
};

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
));
CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
  className: PropTypes.string,
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
