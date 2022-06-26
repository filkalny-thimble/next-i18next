import { SSRConfig, UserConfigOverrideSSP } from './types';
export declare const serverSideTranslations: (initialLocale: string, namespacesRequired?: string[] | undefined, configOverride?: UserConfigOverrideSSP | null) => Promise<SSRConfig>;
