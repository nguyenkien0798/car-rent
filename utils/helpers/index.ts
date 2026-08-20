type QueryParamValue = string | number | boolean | null | undefined;

export const buildQueryString = (
  params: Record<string, QueryParamValue>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams.toString();
};

export const appendQueryString = (
  baseUrl: string,
  params: Record<string, QueryParamValue>
): string => {
  const queryString = buildQueryString(params);

  if (!queryString) {
    return baseUrl;
  }

  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${queryString}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serialize = (params: any) => {
  return buildQueryString(params);
};