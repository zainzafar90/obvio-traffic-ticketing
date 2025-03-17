export type SingleItemResponse<T> = {
  [K in keyof T as `${string & K}`]: T[K];
};

export type ResourceResponse<T> = SingleItemResponse<T>;
