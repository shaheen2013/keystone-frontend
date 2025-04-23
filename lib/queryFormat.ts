export const queryFormat = (query: any): string => {
  const hasQuery = query && Object.keys(query).length > 0;

  if (!hasQuery) {
    return "";
  }

  const searchParams = new URLSearchParams(query).toString();
  return `?${searchParams}`;
};
