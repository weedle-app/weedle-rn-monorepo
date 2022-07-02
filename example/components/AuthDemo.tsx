import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-native';
import type WalletConnect from '@walletconnect/client';

import { useWalletConnectAuth, Authable } from '@weedle/auth';

interface Props {
  rpc: {
    url: string;
    chainId: number;
  };
}

const HandleWalletConnect = ({ rpc }: Props) => {
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const weedleAuth: Authable = useWalletConnectAuth();

  /*
    const validateWalletConnection = (walletConnectContext) => {
        // Uncomment if you wish to check that the network the user is connected to is the right one
        // Here we are using chainId, but we can check something more explicity
        // By getting the provider the user currently has and comparing against the rpc (provider.rpc) details
        // but this is a quick check

        if (walletConnectContext.chainId !== rpc.chainId) {

          //const provider: WalletConnectProvider = await Provider.resolveWalletConnectProviderFromConfig({ rpc }, walletConnectContext);

          await Provider.switchOrAddNetwork({
            walletConnectContext,
            config: {
              rpc: {
                url: 'http://localhost:8545',
                chainId: 1337,
              },
            },
          });
        }
    };
  */

  useEffect(() => {
    (async () => {
      const { getSession } = weedleAuth;
      const walletConnectContext: WalletConnect = getSession();

      if (walletConnectContext && walletConnectContext.connect) {
        if (walletConnectContext.connected) {
          // validateWalletConnection(walletConnectContext)
        }

        setConnector(walletConnectContext);
        setIsConnected(walletConnectContext.connected);
      }
    })();
  }, [weedleAuth]);

  useEffect(() => {
    if (connector) {
      connector.on('connect', async (err, connectDetails) => {
        // validateWalletConnection(connectDetails, walletConnectContext)
        console.log({ err, connectDetails });
      });

      connector.on('disconnect', (err, p) => {
        console.log('disconnect', { err, p });
      });
    }
  }, [connector]);

  useEffect(() => {
    return () => {
      if (connector) {
        connector.off('connect');
        connector.off('disconnect');
      }
    };
  }, []);

  const toggleLoginOut = async () => {
    try {
      if (!isConnected) {
        await weedleAuth.login();
      } else {
        weedleAuth.logout();
      }
    } catch (e) {
      console.log(e, e.code, e.message);
    }
  };

  return <>{connector ? <Button title={isConnected ? 'Disconnect' : 'Connect'} onPress={toggleLoginOut} /> : null}</>;
};

export default HandleWalletConnect;
