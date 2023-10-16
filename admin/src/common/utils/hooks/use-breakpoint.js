// reference by https://github.com/iiroj/use-breakpoint
import { useEffect, useState } from 'react';
import { debounce } from '../functions';

// export Config = {
//   [key: string];
// };
// 
// export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const getBreakpoint = (width, breakpoints) => {
  const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => breakpoints[b] - breakpoints[a]);

  for (const breakpoint of sortedBreakpoints) {
    if (breakpoints[breakpoint] < width) {
      return breakpoint;
    }
  }

  return sortedBreakpoints[sortedBreakpoints.length - 1];
};

/**
 * TODO: use context not to add many listeners
 **/
export const useBreakpoint = (breakpoints, defaultBreakpoint) => {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (!process.browser) return defaultBreakpoint;

    return getBreakpoint(window.innerWidth, breakpoints);
  });

  useEffect(() => {
    const calcInnerWidth = debounce(() => {
      setBreakpoint(getBreakpoint(window.innerWidth, breakpoints));
    }, 200);

    window.addEventListener('resize', calcInnerWidth);

    return () => window.removeEventListener('resize', calcInnerWidth);
  }, [breakpoints]);

  return breakpoint;
};
