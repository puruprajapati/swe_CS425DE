//size can be width, height, padding, margin, ...
export const useCalcSize = (size, screenDesign) => {
  const currentSize = (size / screenDesign) * 100;

  return Math.round(currentSize);
};
