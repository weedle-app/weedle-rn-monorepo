import React, { createContext, useContext } from 'react';

import WalletConnectProvider, {
  type WalletConnectProviderProps,
  // @ts-ignore
} from '@walletconnect/react-native-dapp';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IAsyncStorage } from './WalletConnect/AsyncStorage';
import type { AuthServiceProviderProps } from './types';

const initOptions = {
  adapter: '',
  options: undefined,
  children: () => null,
  apiKey: '',
  serverUrl: '',
};

const validateProps = (options: WalletConnectProviderProps) => {
  if (!options.redirectUrl) {
    throw new Error(
      'Redirect Url prop is missing, please provide a value for it.'
    );
  }
};

const WeedleAuthContext = createContext<AuthServiceProviderProps>(initOptions);

export const useWeedleAuthContext = () =>
  useContext<AuthServiceProviderProps>(WeedleAuthContext);

const WeedleAuthProvider = (
  props: React.PropsWithChildren<AuthServiceProviderProps>
) => {
  if (!props) {
    throw new Error('Please provide a valid adapter type you wish to use.');
  }

  const renderAuthContainer = () => {
    switch (props.adapter) {
      case 'walletconnect': {
        validateProps(props.options as WalletConnectProviderProps);
        return WalletConnectProvider({
          ...(props.options as WalletConnectProviderProps),
          children: props.children as JSX.Element,
          storageOptions: {
            asyncStorage: AsyncStorage as unknown as IAsyncStorage,
          },
        });
      }
      default: {
        throw new Error('Please provide a valid adapter type you wish to use.');
      }
    }
  };

  return (
    <WeedleAuthContext.Provider
      value={{
        ...props,
      }}
    >
      {renderAuthContainer()}
    </WeedleAuthContext.Provider>
  );
};

export default WeedleAuthProvider;
