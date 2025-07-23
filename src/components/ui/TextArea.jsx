import React from 'react';

const TextArea = React.forwardRef(({ 
  className = '',
  placeholder = '',
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={`min-h-[144px] px-[15px] py-[15px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl text-base leading-6 text-recruit-primary-light placeholder:text-recruit-primary-light focus:outline-none focus:ring-2 focus:ring-recruit-blue focus:border-recruit-blue ${className}`}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
});

TextArea.displayName = 'TextArea';

export { TextArea };
