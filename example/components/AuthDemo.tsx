import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import type WalletConnect from '@walletconnect/client';
import { useWalletConnectAuth, Authable } from '@weedle-app/auth';

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
    const switchNetwork = async () => {
    if (connector) {
      await Provider.switchOrAddNetwork({
        walletConnectContext: connector,
        config: {
          rpc: {
            url: 'http://localhost:8545',
            chainId: 1337,
          },
        },
      });
    } else {
      console.log('connector not initizlied');
    }
  };
  
  const validateWalletConnection = async (walletConnectContext: WalletConnect) => {
    // Uncomment if you wish to check that the network the user is connected to is the right one
    // Here we are using chainId, but we can check something more explicity
    // By getting the provider the user currently has and comparing against the rpc (provider.rpc) details
    // but this is a quick check

    if (walletConnectContext.chainId !== rpc.chainId) {
      // const provider: WalletConnectProvider = await Provider.resolveWalletConnectProviderFromConfig({ rpc }, walletConnectContext);

      // If the user is on the wrong network, you can display a modal here asking for approval to switch
      // You need a modal because a wallet like metamask for example will not work without a user action
      // In the modal you can then call the function above `switchNetwork`

    }
  };

  useEffect(() => {
    // There are errors that can crash the app from wallet connect and some other web3 libraries
    // The error will be handled internally by the SDK and emitted safely
    // It can be listened for using the code below
    DeviceEventEmitter.addListener('wdl:network:error', (d) => {
      console.log('device emitter', d);
    });

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []); */

  useEffect(() => {
    (async () => {
      const { getSession } = weedleAuth;
      const walletConnectContext: WalletConnect = getSession();

      // We need to check the connect because before the object sometimes only contains the connector property
      if (walletConnectContext && walletConnectContext.connect) {
        if (walletConnectContext.connected) {
          // await validateWalletConnection(walletConnectContext);
        }

        setConnector(walletConnectContext);
        setIsConnected(walletConnectContext.connected);
      }
    })();
  }, [weedleAuth]);

  /*  useEffect(() => {
    if (connector) {
      connector.on('connect', async (err, connectDetails) => {
        await validateWalletConnection(connectDetails);
        console.log({ err, connectDetails });
      });

      connector.on('disconnect', (err, p) => {
        console.log('disconnect', { err, p });
      });
    }
  }, [connector]); */

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
