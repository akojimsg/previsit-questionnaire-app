/* eslint-disable @typescript-eslint/no-unsafe-return */
export const toPlainMap = (mapLike: any): Record<string, string> =>
  mapLike instanceof Map
    ? Object.fromEntries(mapLike.entries())
    : (mapLike ?? {});
