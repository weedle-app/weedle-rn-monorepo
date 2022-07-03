import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeedleApp, { WeedleProvider } from '@weedle/app';
import WeedleAuthProvider, { AuthServiceProviderProps } from '@weedle/auth';
import HandleWalletConnect from './components/AuthDemo';

const rpc = {
  url: 'https://f67f-50-66-132-160.ngrok.io/',
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
          <HandleWalletConnect rpc={rpc} />
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style='auto' />
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
