import type WalletConnect from '@walletconnect/client';
import { ethers } from 'ethers';

import { Provider, InitOptions } from '@weedle/app';
import type { Authable, LoginResponse } from '../types';

const WalletConnectAuth = (
  config: InitOptions,
  walletConnectContext: WalletConnect
): Authable => ({
  getSession: (): WalletConnect => {
    return walletConnectContext;
  },

  async getWalletSigner() {
    const walletConnectProvider =
      await Provider.resolveWalletConnectProviderFromConfig(
        config,
        walletConnectContext
      );

    const provider = new ethers.providers.Web3Provider(walletConnectProvider);
    return provider.getSigner();
  },

  async login(): Promise<LoginResponse> {
    const loginResponse: LoginResponse = {
      isOnRequestedNetwork: true,
      chainId: -1,
      accounts: [],
      networkId: -1,
      rpcUrl: '',
    };

    if (!walletConnectContext.connected) {
      const connectDetails = await walletConnectContext.connect();
      const { chainId } = await Provider.resolveRpcInfo(config);

      loginResponse.isOnRequestedNetwork = chainId === connectDetails.chainId;

      console.log('current state of connect', walletConnectContext.connected);
      return { ...loginResponse, ...connectDetails };
    }

    return loginResponse;
  },

  async logout() {
    if (walletConnectContext.connected) {
      await walletConnectContext.killSession();
    }
  },
});

export default WalletConnectAuth;
