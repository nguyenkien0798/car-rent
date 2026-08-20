export type QueryParamValue = string | number | boolean | null | undefined;

const normalizeQueryParams = (params?: Record<string, QueryParamValue>) => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams.toString();
};

export const buildApiUrl = (
  url: string,
  params?: Record<string, QueryParamValue>,
) => {
  const queryString = normalizeQueryParams(params);

  if (!queryString) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryString}`;
};

export const customFetch = async <T>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    query?: Record<string, QueryParamValue>;
    body?: unknown;
    headers?: Record<string, string>;
    lang?: string;
  } = {},
): Promise<T> => {
  const baseUrl = (process.env.NEXT_PUBLIC_URL_API || "").replace(/\/+$/, "");
  const cleanUrl = url.replace(/^\/+/, "");
  const endpoint = buildApiUrl(`${baseUrl}/${cleanUrl}`, options.query);
  const locale = options.lang || "vi";

  const response = await fetch(endpoint, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale === "en" ? "en-US" : "vi",
      ...options.headers,
    },
    body:
      options.body !== undefined &&
      options.method &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(options.method)
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}${
        errorText ? ` - ${errorText}` : ""
      }`,
    );
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
};
