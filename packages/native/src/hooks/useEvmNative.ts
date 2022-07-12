import { useWalletConnectAuth } from '@weedle-app/auth';
import EvmContractAPI from '../evm/EvmContractAPI';
import type { EvmContractFuncArgs } from '../types/EvmContractTypes';

const useEvmNative = () => {
  const { getWalletSigner, getCurrentProvider } = useWalletConnectAuth();

  return {
    runContractFunction: async (
      options: EvmContractFuncArgs,
      isReadOnly = false
    ) => {
      if (!options.walletSignerOrProvider) {
        const signerOrProvider = !isReadOnly
          ? await getWalletSigner()
          : await getCurrentProvider();
        options.walletSignerOrProvider = signerOrProvider;
      }
      return !isReadOnly
        ? EvmContractAPI.runContractWriteFunction(options)
        : EvmContractAPI.runContractReadOnlyFunction(options);
    },
  };
};

export default useEvmNative;
