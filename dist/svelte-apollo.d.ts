/// <reference types="zen-observable" />
import { ApolloClient, FetchResult, MutationOptions, ApolloError, ObservableQuery, WatchQueryOptions, OperationVariables, DataProxy, SubscriptionOptions } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { Readable } from 'svelte/store';

declare function getClient<TCache = any>(): ApolloClient<TCache>;
declare function setClient<TCache = any>(client: ApolloClient<TCache>): void;

declare type MutateOptions<T = any, TVariables = any> = Omit<MutationOptions<T, TVariables>, "mutation">;
declare type Mutate<T = any, TVariables = any> = (options: MutateOptions<T, TVariables>) => Promise<FetchResult<T>>;
declare function mutation<T = any, TVariables = any>(mutation: DocumentNode): Mutate<T, TVariables>;

interface Loading {
    loading: true;
    data?: undefined;
    error?: undefined;
}
interface Error {
    loading: false;
    data?: undefined;
    error: ApolloError | Error;
}
interface Data<TData = any> {
    loading: false;
    data: TData | null | undefined;
    error?: undefined;
}
declare type Result<TData = any> = Loading | Error | Data<TData>;
declare type ReadableResult<TData = any> = Readable<Result<TData>>;
interface ObservableQueryExtensions {
    fetchMore: ObservableQuery["fetchMore"];
    getCurrentResult: ObservableQuery["getCurrentResult"];
    getLastError: ObservableQuery["getLastError"];
    getLastResult: ObservableQuery["getLastResult"];
    isDifferentFromLastResult: ObservableQuery["isDifferentFromLastResult"];
    refetch: ObservableQuery["refetch"];
    resetLastResults: ObservableQuery["resetLastResults"];
    resetQueryStoreErrors: ObservableQuery["resetQueryStoreErrors"];
    result: ObservableQuery["result"];
    setOptions: ObservableQuery["setOptions"];
    setVariables: ObservableQuery["setVariables"];
    startPolling: ObservableQuery["startPolling"];
    stopPolling: ObservableQuery["stopPolling"];
    subscribeToMore: ObservableQuery["subscribeToMore"];
    updateQuery: ObservableQuery["updateQuery"];
}
declare type ReadableQuery<TData> = ReadableResult<TData> & ObservableQueryExtensions;

declare function query<TData = any, TVariables = any>(query: DocumentNode, options?: Omit<WatchQueryOptions<TVariables>, "query">): ReadableQuery<TData>;

declare function restore<TData = any, TVariables = OperationVariables>(query: DocumentNode, options: Omit<DataProxy.WriteQueryOptions<TData, TVariables>, "query">): void;

declare function subscribe<TData = any, TVariables = any>(query: DocumentNode, options?: Omit<SubscriptionOptions<TVariables>, "query">): ReadableResult<TData>;

export { ReadableQuery, ReadableResult, Result, getClient, mutation, query, restore, setClient, subscribe };
