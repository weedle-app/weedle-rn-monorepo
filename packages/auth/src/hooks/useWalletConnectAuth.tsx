// @ts-ignore
import { useWalletConnect } from '@walletconnect/react-native-dapp';
// @ts-ignore
import { useWeedleApp } from '@weedle/app';

import WalletConnectAuth from '../WalletConnect';

const useWalletConnectAuth = () => {
  const { config } = useWeedleApp();
  const walletConnectContext = useWalletConnect();

  return WalletConnectAuth(config, walletConnectContext);
};

export default useWalletConnectAuth;
