// src/hooks/useQueryParams.ts
import { useSearchParams } from 'react-router-dom';

export const useQueryParams = <T extends Record<string, string>>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (): Partial<T> => {
    const params: Partial<T> = {};
    searchParams.forEach((value, key) => {
      params[key as keyof T] = value as T[keyof T];
    });
    return params;
  };

  const setParams = (params: Partial<T>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return { params: getParams(), setParams };
};