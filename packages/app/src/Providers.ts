import type WalletConnect from '@walletconnect/client';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

import type { InitOptions } from './types';

interface SwitchNetworkArgs {
  chainId?: number;
  config: InitOptions;
  walletConnectContext: WalletConnect;
}

class Providers {
  async switchOrAddNetwork({
    walletConnectContext,
    config,
    chainId,
  }: SwitchNetworkArgs) {
    if (!chainId) {
      const { chainId: currentChainId } = await this.resolveRpcInfo(config);
      chainId = currentChainId;
    }
    const hexChainId = ethers.utils.hexStripZeros(
      ethers.utils.hexlify(chainId)
    );
    try {
      await walletConnectContext.sendCustomRequest({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: hexChainId,
          },
        ],
      });
    } catch (e: any) {
      const unknownChain = e.message.includes(
        'Try adding the chain using wallet_addEthereumChain first'
      );
      if (unknownChain) {
        await walletConnectContext.sendCustomRequest({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: hexChainId,
              rpcUrls: [config.provider?.url || config.rpc?.url],
              ...(config.networkMetaData ? config.networkMetaData : {}),
            },
          ],
        });
      } else {
        throw e;
      }
    }
  }

  async resolveRpcInfo(config: InitOptions) {
    const defaultRpcUrl = 'http://127.0.0.1:8545';
    const defaultChainId = 1337;

    let [rpcUrl, chainId] = [defaultRpcUrl, defaultChainId];

    if (config.provider) {
      const thirdPartyProvider = ethers.getDefaultProvider(
        config.provider.environment,
        {
          [config.provider.name as string]: config.provider.url,
        }
      );

      chainId = thirdPartyProvider.network.chainId;

      rpcUrl = config.provider.url || defaultRpcUrl;
    }

    if (config.rpc) {
      chainId = config.rpc.chainId || defaultChainId;
      rpcUrl = config.rpc.url || defaultRpcUrl;
    }

    return { chainId, rpcUrl };
  }

  async resolveWalletConnectProviderFromConfig(
    config: InitOptions,
    walletConnectContext: WalletConnect,
    canSwitchNetwork = false
  ) {
    const { chainId, rpcUrl } = await this.resolveRpcInfo(config);

    if (chainId !== walletConnectContext.chainId && canSwitchNetwork) {
      await this.switchOrAddNetwork({
        walletConnectContext,
        chainId,
        config,
      });
    }

    const rpc = { [chainId]: rpcUrl };

    const walletConnectProvider = new WalletConnectProvider({
      connector: walletConnectContext,
      rpc,
      chainId,
    });
    await walletConnectProvider.enable();

    return walletConnectProvider;
  }
}

const provider = () => new Providers();

export default provider();
