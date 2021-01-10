import Resource from "./resource";

export interface ApiResult<T> {
  data: T;
}

export interface ApiError {
  source: string;
  code: string;
}

export interface ApiErrors {
  errors: ApiError[];
}

export type ApiResponse<T> = ApiResult<T> | ApiErrors;

export async function get(resource: Resource): Promise<Response> {
  return fetch(resource);
}
