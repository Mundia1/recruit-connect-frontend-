import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ label = 'Password', ...props }) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const strength =
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[\W_]/.test(value)
      ? 'Strong'
      : value.length > 0
      ? 'Weak'
      : '';

      return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full pr-16 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
          placeholder="Enter password"
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3"
        >
          {visible
            ? <EyeOff size={20} className="text-gray-600 hover:text-gray-800" />
            : <Eye    size={20} className="text-gray-600 hover:text-gray-800" />
          }
        </button>
      </div>
      {strength && (
        <p
          className={`mt-1 text-sm ${
            strength === 'Strong' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {strength} password
        </p>
      )}
    </div>
  );
}

