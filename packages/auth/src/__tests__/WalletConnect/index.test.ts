import { _nameprepTableC } from '@ethersproject/strings/lib/idna';
import WalletConnect from '@walletconnect/client';
import * as ethers from 'ethers';
import * as WeedleApp from '@weedle-app/app';

import type { Authable } from '../../types';
import WalletConnectAuth from '../../WalletConnect';

jest.mock('@walletconnect/client');
jest.mock('@weedle-app/app');

const rpc = {
  chainId: 1337,
  url: 'http://localhost:8545',
};
let walletConnectAuth: Authable;
let walletConnect: WalletConnect;

describe('WalletConnectAuth', () => {
  beforeEach(() => {
    (WalletConnect as jest.Mock).mockClear();

    walletConnect = new WalletConnect({ uri: rpc.url });

    walletConnectAuth = WalletConnectAuth(
      {
        rpc,
      },
      walletConnect
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('getSession', () => {
    it('should return wallet connect object', () => {
      const actual = walletConnectAuth.getSession();

      expect(actual instanceof WalletConnect).toBeTruthy();
    });
  });
  describe('getWalletSigner', () => {
    it('should return a signer', async () => {
      (
        jest.spyOn(
          ethers.ethers.providers,
          'Web3Provider'
        ) as jest.MockInstance<any, any>
      ).mockReturnValueOnce({
        getSigner: () => ({
          _isSigner: true,
        }),
      });
      const actual = await walletConnectAuth.getWalletSigner();

      expect(actual._isSigner).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should return default login response if user is already connected to wallet', async () => {
      const expected = {
        isOnRequestedNetwork: true,
        chainId: -1,
        accounts: [],
        networkId: -1,
        rpcUrl: '',
      };
      walletConnect.connected = true;

      const actual = await walletConnectAuth.login();

      expect(actual).toMatchObject(expected);
    });
    it('should return correct logged in response if user is not connected in to wallet', async () => {
      (
        jest.spyOn(walletConnect, 'connect') as jest.MockInstance<any, any>
      ).mockResolvedValueOnce({
        chainId: 1337,
        accounts: ['someAccount'],
        networkId: 3,
        rpcUrl: 'someurl',
      });

      (
        jest.spyOn(WeedleApp.Provider, 'resolveRpcInfo') as jest.MockInstance<
          any,
          any
        >
      ).mockResolvedValueOnce({ chainId: 1337 });

      const expected = {
        isOnRequestedNetwork: true,
        chainId: 1337,
        accounts: ['someAccount'],
        networkId: 3,
        rpcUrl: 'someurl',
      };
      walletConnect.connected = false;

      const actual = await walletConnectAuth.login();

      expect(actual).toMatchObject(expected);
    });

    it('should return correct logged in response with isOnRequestedNetwork false when chainid is wrong', async () => {
      (
        jest.spyOn(walletConnect, 'connect') as jest.MockInstance<any, any>
      ).mockResolvedValueOnce({
        chainId: 1337,
        accounts: ['someAccount'],
        networkId: 3,
        rpcUrl: 'someurl',
      });

      (
        jest.spyOn(WeedleApp.Provider, 'resolveRpcInfo') as jest.MockInstance<
          any,
          any
        >
      ).mockResolvedValueOnce({ chainId: 1 });

      const expected = {
        isOnRequestedNetwork: false,
        chainId: 1337,
        accounts: ['someAccount'],
        networkId: 3,
        rpcUrl: 'someurl',
      };

      walletConnect.connected = false;

      const actual = await walletConnectAuth.login();

      expect(actual).toMatchObject(expected);
    });
  });
});
