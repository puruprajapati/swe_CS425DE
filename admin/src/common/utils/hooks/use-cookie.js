import React from 'react';
import { getCookie, deleteCookie, setCookie } from '@common/utils';

export function useCookie(keyForValue, defaultValue) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const rawValue = getCookie(keyForValue);

    setValue(rawValue ?? defaultValue);
  }, [defaultValue, keyForValue]);

  const saveValue = React.useCallback(
    (value) => {
      if (value === undefined || value === null) {
        deleteCookie(keyForValue);
      } else {
        const maxAge = 2147483647;

        setCookie(keyForValue, value, maxAge);
      }

      setValue(value);
    },
    [keyForValue],
  );

  return [value, saveValue];
}
