import React from 'react';

const useStorage = (key: string, initialValue: any) => {
  const store = JSON.parse(localStorage.getItem(key) || 'null');
  const [value, setCurrentValue] = React.useState<any>(store || initialValue);

  const setValue = (value: string) => {
    setCurrentValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setValue];
};

export default useStorage;
