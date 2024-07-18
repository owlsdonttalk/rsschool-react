import React, { useEffect, useState } from 'react';
import { INPUT_VALUE } from '@constants';

export default function useLocalStorage(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  () => string | void,
] {
  const [value, setValue] = useState<string>(localStorage[INPUT_VALUE] || '');

  useEffect(() => {
    localStorage.setItem(INPUT_VALUE, value);
  }, [value]);

  const removeValue = () => {
    localStorage.removeItem(INPUT_VALUE);
  };

  return [value, setValue, removeValue];
}
