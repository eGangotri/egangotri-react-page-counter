export const capitalize = (_text: string) => {
  return _text
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w: string) =>
      w.replace(/^\w/, (c: string) => c.toUpperCase())
    );
};
