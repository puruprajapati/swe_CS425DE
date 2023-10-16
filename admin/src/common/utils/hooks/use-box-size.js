import React, { useState } from 'react';

export const useBoxSize = (ref) => {
  const [size, setSize] = useState();

  React.useEffect(() => {
    // Handler to call on window resize
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const currentScreen = window.innerHeight;

        const height = currentScreen - ref.current.offsetTop;

        setSize(height);
      };

      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size

      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [ref]);

  return size;
};
