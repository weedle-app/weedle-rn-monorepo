// @ts-ignore
import { useWalletConnect } from '@walletconnect/react-native-dapp';
// @ts-ignore
import { useWeedleApp } from '@weedle-app/app';
import type { Authable } from '../types';

import WalletConnectAuth from '../WalletConnect';

const useWalletConnectAuth = (): Authable => {
  const { config } = useWeedleApp();
  const walletConnectContext = useWalletConnect();

  return WalletConnectAuth(config, walletConnectContext);
};

export default useWalletConnectAuth;
