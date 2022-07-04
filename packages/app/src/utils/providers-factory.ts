/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers } from 'ethers';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';

export type ChainEnvironmentName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli';

export const getClientId = (environment: string): number => {
  switch (environment) {
    case 'mainnet':
      return 1;
    case 'rinkeby':
      return 4;
    case 'ropsten':
      return 3;
    case 'goerli':
      return 5;
    default:
      return 1;
  }
};

export const WeedleProviderFactory = (
  environment: ChainEnvironmentName = 'ropsten',
  url = '',
  writerObject?: any
) => {
  const chainId = getClientId(environment);
  const rpc = { [chainId]: url };
  if (writerObject) {
    return new WalletConnectProvider({
      rpc,
      connector: writerObject,
    });
  }
  return new ethers.providers.JsonRpcProvider(url);
};
