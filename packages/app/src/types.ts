export type ProvidersType = 'alchemy' | 'weedle' | undefined;

export interface InitOptions {
  rpc?: {
    url?: string;
    chainId?: number;
  };
  provider?: {
    name: ProvidersType;
    url?: string;
    appId?: string;
    environment: string;
  };
  networkMetaData?: {
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
      blockExplorerUrls?: string[];
    };
  };
}
