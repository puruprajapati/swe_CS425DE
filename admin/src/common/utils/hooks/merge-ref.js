export const mergeRefs = (refs) => {
  return (value) => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(value);
        } else {
          ref.current = value;
        }
      }
    });
  };
};
