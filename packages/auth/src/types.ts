// @ts-ignore
import { type WalletConnectProviderProps } from '@walletconnect/react-native-dapp';
// @ts-ignore
import type WalletConnect from '@walletconnect/client';
// @ts-ignore
import type { ethers } from 'ethers';

export interface LoginResponse {
  isOnRequestedNetwork: boolean;
  chainId: number;
  accounts: string[];
  networkId?: number;
  rpcUrl?: string;
}

export interface Authable {
  getSession: () => WalletConnect;
  getWalletSigner: () => Promise<ethers.providers.JsonRpcSigner>;
  getCurrentProvider: () => Promise<ethers.providers.JsonRpcProvider>;
  login: () => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

type AuthAdapterTypes = 'walletconnect' | string;
type AuthAdapterOptions = Partial<WalletConnectProviderProps>;

export interface AuthServiceProviderProps {
  adapter: AuthAdapterTypes;
  options?: AuthAdapterOptions;
}
