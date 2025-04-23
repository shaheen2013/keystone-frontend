export const queryFormat = (query: any): string => {
  const hasQuery = query && Object.keys(query).length > 0;
  if (!hasQuery) return "";

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        params.append(`${key}[${index}]`, String(item));
      });
    } else if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return `?${params.toString()}`;
};
