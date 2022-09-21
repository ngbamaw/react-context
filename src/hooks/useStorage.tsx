import React from 'react';

const useStorage = (key: string, initialValue: any) => {
  const [value, setCurrentValue] = React.useState<any>(
    () => JSON.parse(localStorage.getItem(key) || 'null') || initialValue,
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setCurrentValue];
};

export default useStorage;
