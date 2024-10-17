type Configuration = {
    baseURL?: string;
};

type RecordResponse<T> = {
    data: Array<T>;
    totalRecords: number;
};

type DataWrapper<T> = {
    data: T;
};

type WithoutID<T> = Remove<T, "ID" | "id">;

type Include<T, U> = T extends U ? T : never;

type StandardEnum<T extends number | string> =
    | { [key: number]: T }
    | { [key: string]: T };

type DateUnit =
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "month"
    | "year"
    | "century";

type Matrix<T> = Array<Array<T>>;

type MergeTypes<Types extends any[], TResult = {}> = Types extends [
    infer THead,
    ...infer TRemainder,
]
    ? MergeTypes<TRemainder, TResult & THead>
    : TResult;

type OneOf<
    Types extends any[],
    TResult = never,
    TProperties = MergeTypes<Types>,
> = Types extends [infer THead, ...infer TRemainder]
    ? OneOf<TRemainder, TResult | OnlyFirst<THead, TProperties>, TProperties>
    : TResult;

type OneOfTwo<T, U> = OnlyFirst<T, U> | OnlyFirst<U, T>;

type OnlyFirst<T, U> = T & { [K in keyof Omit<U, keyof T>]?: never };
