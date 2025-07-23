import React, { useState } from 'react';

export default function PasswordInput({ label = 'Password', ...props }) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  // Very simple strength checker:
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



      
}