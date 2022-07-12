import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeedleApp, { WeedleProvider } from '@weedle-app/app';
import WeedleAuthProvider, { AuthServiceProviderProps } from '@weedle-app/auth';
import HandleWalletConnect from './components/AuthDemo';
import RunContract from './components/RunContract';

const rpc = {
  url: 'http://localhost:8545',
  chainId: 1337,
};

const client = new WeedleApp(
  {
    rpc,
  },
  { handleErrors: true }
);

const authProps: AuthServiceProviderProps = {
  adapter: 'walletconnect',
  options: {
    redirectUrl: 'wex://app',
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <WeedleProvider client={client}>
        <WeedleAuthProvider {...authProps}>
          <View>
            <HandleWalletConnect rpc={rpc} />
            <RunContract />
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style='auto' />
          </View>
        </WeedleAuthProvider>
      </WeedleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
