// @ts-ignore
import type WalletConnect from '@walletconnect/client';
// @ts-ignore
import { ethers } from 'ethers';
// @ts-ignore
import { Provider, InitOptions } from '@weedle-app/app';
import type { Authable, LoginResponse } from '../types';

const WalletConnectAuth = (
  config: InitOptions,
  walletConnectContext: WalletConnect
): Authable => ({
  getSession: (): WalletConnect => {
    return walletConnectContext;
  },

  async getCurrentProvider(): Promise<ethers.providers.JsonRpcProvider> {
    const provider = await Provider.resolveWalletConnectProviderFromConfig(
      config,
      walletConnectContext
    );

    return new ethers.providers.Web3Provider(provider);
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
