const makeZeroIfNegative = (v: number) => v < 0 ? 0 : v;
const deltaOrCacheSize = (delta: number, cacheSize: number) =>  delta>cacheSize?cacheSize:makeZeroIfNegative(delta);

export const calculateChunkLength = (from: number, cacheSize: number, total: number) => {
  if (cacheSize <= 0) {
    return 0;
  }
  return deltaOrCacheSize(
    makeZeroIfNegative(total) - makeZeroIfNegative(from),
    cacheSize,
  );
}