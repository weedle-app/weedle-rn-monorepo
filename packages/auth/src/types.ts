// @ts-ignore
import { type WalletConnectProviderProps } from '@walletconnect/react-native-dapp';
import type WalletConnect from '@walletconnect/client';
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
  login: () => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

type AuthAdapterTypes = 'walletconnect' | string;
type AuthAdapterOptions = Partial<WalletConnectProviderProps>;

export interface AuthServiceProviderProps {
  adapter: AuthAdapterTypes;
  options?: AuthAdapterOptions;
}
