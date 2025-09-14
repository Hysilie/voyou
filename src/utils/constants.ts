export const currency = (n: number) =>
  `${(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} $`;