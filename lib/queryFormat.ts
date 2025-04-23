export const queryFormat = (query: any) =>
  `${new URLSearchParams(query).toString()}`;
