import React, { useState } from 'react';

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