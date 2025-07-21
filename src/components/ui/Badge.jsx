export const Badge = ({ children, className = "", variant = "default" }) => (
  <span className={`inline-block px-2 py-1 rounded ${className} bg-gray-200 text-gray-700`}>
    {children}
  </span>
);