const makeZeroIfNegative = (v: number) => v < 0 ? 0 : v;
const deltaOrCacheSize = (delta: number, cacheSize: number) =>  delta>cacheSize?cacheSize:makeZeroIfNegative(delta);

export const calculateFinalItemIndex = (index: number, total: number) => index < 0 ? 0 : total < 0 ? 0 : Math.min(index, total);
export const calculateChunkLength = (from: number, cacheSize: number, total: number) => {
  if (cacheSize <= 0) {
    return 0;
  }
  return deltaOrCacheSize(
    makeZeroIfNegative(total) - makeZeroIfNegative(from),
    cacheSize,
  );
}