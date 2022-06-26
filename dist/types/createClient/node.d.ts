import { InternalConfig, CreateClientReturn } from '../types';
declare const globalInstanceKey: unique symbol;
declare type GlobalInstanceKey = typeof globalInstanceKey;
declare const _default: (config: InternalConfig, instanceKey?: string | GlobalInstanceKey) => CreateClientReturn;
export default _default;
