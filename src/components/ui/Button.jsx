import React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'div' : 'button';

  const baseClasses = 'inline-flex items-center justify-center rounded-[var(--radius-md)] text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-[var(--green-primary)] text-white hover:bg-[var(--green-dark)]',
    secondary: 'bg-[var(--green-secondary)] text-white hover:bg-[var(--green-darker)]',
    ghost: 'hover:bg-[var(--green-light)] hover:text-[var(--green-darker)]',
    link: 'text-[var(--green-primary)] underline-offset-4 hover:underline',
  };

  const sizeClasses = {
    sm: 'h-[40px] px-4',
    md: 'h-[48px] px-6',
  };

  return (
    <Comp
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md']),
  asChild: PropTypes.bool,
};

export default Button;
