import { stringify } from "qs";

import { apiUrl } from "../../utils/common.utils";

const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getUrl = (path: string, query?: Record<string, any>) => {
  const params = query ? stringify(query) : null;

  return `${apiUrl}${path}${params ? `?${params}` : ""}`;
};

const getBody = (payload?: Record<string, any>) => {
  return payload ? JSON.stringify(payload) : undefined;
};

function getOptions(
  options?: Omit<RequestInit, "body">,
  payload?: Record<string, any>
): RequestInit {
  const body = getBody(payload);

  return {
    ...options,
    headers: {
      ...commonHeaders,
      ...options?.headers,
    },
    body,
    credentials: "include",
  };
}

async function makeRequest<
  TRes,
  TPayload extends Record<string, any> | undefined,
  TQuery extends Record<string, any> | undefined = undefined,
>(
  path: string,
  payload?: TPayload,
  query?: TQuery,
  options?: Omit<RequestInit, "body">
): Promise<TRes> {
  const url = getUrl(path, query);
  const requestOptions = getOptions(options, payload);

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const errorData = await response.json();
    // Temp: Add a better error type
    throw errorData;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return {} as TRes;
  }
}

export async function getRequest<
  TRes,
  TQuery extends Record<string, any> | undefined = {},
>(
  path: string,
  query?: TQuery,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined, Record<string, any>>(
    path,
    undefined,
    query,
    {
      ...options,
      method: "GET",
    }
  );
}

export async function postRequest<
  TRes,
  TPayload extends Record<string, any> | undefined = {},
>(
  path: string,
  payload?: TPayload,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, Record<string, any>, undefined>(
    path,
    payload,
    undefined,
    {
      ...options,
      method: "POST",
    }
  );
}

export async function patchRequest<
  TRes,
  TPayload extends Record<string, any> | undefined = {},
>(
  path: string,
  payload?: TPayload,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, Record<string, any>, undefined>(
    path,
    payload,
    undefined,
    {
      ...options,
      method: "PATCH",
    }
  );
}

export async function deleteRequest<
  TRes,
  TPayload extends Record<string, any> | undefined = {},
>(
  path: string,
  payload?: TPayload,
  options?: Omit<RequestInit, "method">
): Promise<TRes> {
  return makeRequest<TRes, Record<string, any>, undefined>(
    path,
    payload,
    undefined,
    {
      ...options,
      method: "DELETE",
    }
  );
}
