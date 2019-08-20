export type Primitive = string | number | boolean | undefined | null;

export type Compact<A> = { [K in keyof A]: A[K] };

export type Overwrite<A extends object, B extends object> = Compact<{ [K in Exclude<keyof A, keyof B>]: A[K] } & B>;

export type DeepPartial<T> = {
  [P in keyof T]?:
  T[P] extends Array<infer U> ? Array<DeepPartial<U>> :
  T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> :
  DeepPartial<T[P]>;
};
