import React from 'react';

export const useFontSize = (
  fontMin,
  fontDesign,
  screenMin,
  screenMax,
  screenDesign,
) => {
  const [fontSize, setFontSize] = React.useState(fontMin);

  React.useEffect(() => {
    // Handler to call on window resize
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const currentScreen = window.innerWidth;
        const fontMax = ((fontDesign - fontMin) / (screenDesign - screenMin)) * (screenMax - screenMin) + fontMin;
        let currentFont = ((fontDesign - fontMin) / (screenDesign - screenMin)) * (currentScreen - screenMin) + fontMin;

        if (currentScreen >= screenMax) {
          currentFont = fontMax;
        }

        if (currentScreen <= screenMin) {
          currentFont = fontMin;
        }

        setFontSize(Math.round(currentFont));
      };

      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size

      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [fontMin, fontDesign, screenMin, screenMax, screenDesign]);

  return fontSize;
};
