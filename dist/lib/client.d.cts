import { ClientOptions } from '../types/index.cjs';
import 'emittery';

declare class Client {
    apiKey: () => Promise<string>;
    baseUrl: string;
    constructor(options?: ClientOptions);
    protected _fetch(path: string, options?: RequestInit): Promise<Response>;
}

export { Client };
