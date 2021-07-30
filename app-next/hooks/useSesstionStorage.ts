import { useCallback, useEffect, useState } from "react";

export const useSessionStorage = <Key extends string>(
  key: Key,
  initialValue?: string,
): [string, (updater: string | ((prev: string) => string)) => void] => {
  const [value, setValue] = useState<string>(
    globalThis?.sessionStorage?.getItem(key) ?? initialValue ?? "",
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {}
  }, [key, value]);

  return [value, setValue];
};
