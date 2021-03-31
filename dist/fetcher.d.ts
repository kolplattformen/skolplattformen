import { Fetch, RequestInit, Response } from './types';
export interface CallInfo extends RequestInit {
    name: string;
    type: string;
    url: string;
    status: number;
    statusText: string;
    error?: Error;
}
export interface FetcherOptions {
    record?: (info: CallInfo, data: string | Blob | ArrayBuffer | any) => Promise<void>;
}
export interface Fetcher {
    (name: string, url: string, init?: RequestInit): Promise<Response>;
}
export interface Recorder {
    (info: CallInfo, data: string | Blob | ArrayBuffer | any): Promise<void>;
}
export default function wrap(fetch: Fetch, options?: FetcherOptions): Fetcher;
