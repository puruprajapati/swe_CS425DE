import React from 'react';
import { debounce } from '../functions';

export const useDelayState = (initialState, delay) => {
  
  const [viewState, setViewState] = React.useState(initialState);
  const [delayState, setDelayState] = React.useState(initialState);

  const updateDelayState = React.useMemo(
    () =>
      debounce((value) => {
        setDelayState(value);
      }, delay),
    [delay, setDelayState],
  );

  const onViewStateChange = React.useCallback(
    (value) => {
      setViewState(value);
      updateDelayState(value);
    },
    [setViewState, updateDelayState],
  );

  return [viewState, delayState, onViewStateChange];
};
