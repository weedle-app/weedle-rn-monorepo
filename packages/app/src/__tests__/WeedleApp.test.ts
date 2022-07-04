/* eslint-disable no-new */
import WeedleApp from '../index';

describe('WeedleApp', () => {
  describe('Rpc and Provider', () => {
    it('should throw an error whenever rpc and provider is not provided', () => {
      try {
        new WeedleApp({});
      } catch (e: any) {
        expect(e.message).toEqual(
          'Invalid credentials provided! Please pass provider or rpc configuration'
        );
      }
    });
    it('should throw an error whenever rpc and provider are provided', () => {
      try {
        new WeedleApp({
          rpc: { chainId: 1337, url: 'http://localhost:8545' },
          provider: { environment: 'ropsten', name: 'weedle' },
        });
      } catch (e: any) {
        expect(e.message).toEqual(
          'Please pass one of rpc or provider config and not both!'
        );
      }
    });
  });
  describe('Rpc', () => {
    it('config should be valid when only rpc config is provided', () => {
      const weedleApp = new WeedleApp({
        rpc: {
          url: 'http://localhost:8545',
          chainId: 1337,
        },
      });
      expect(weedleApp.isInitialized).toBeTruthy();
    });
    it('should throw an error whenever rpc url is not provided', () => {
      try {
        new WeedleApp({ rpc: { chainId: 1337 } });
      } catch (e: any) {
        expect(e.message).toEqual(
          'Invalid credentials provided! Please pass provider or rpc configuration'
        );
      }
    });
    it('should throw an error whenever rpc chainId is not provided', () => {
      try {
        new WeedleApp({ rpc: { url: 'http://localhost:8545' } });
      } catch (e: any) {
        expect(e.message).toEqual(
          'Invalid credentials provided! Please pass provider or rpc configuration'
        );
      }
    });
  });

  describe('Provider', () => {
    it('config should be valid when only provider config is provided', () => {
      const weedleApp = new WeedleApp({
        provider: {
          url: 'http://localhost:8545',
          environment: 'ropsten',
          name: 'alchemy',
        },
      });
      expect(weedleApp.isInitialized).toBeTruthy();
    });
    it('should throw an error whenever provider is weedle but no appId is provided', () => {
      try {
        const weedleApp = new WeedleApp({
          provider: { environment: 'ropsten', name: 'weedle' },
        });
        expect(weedleApp.isInitialized).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Missing or invalid provider credentials.');
      }
    });
    it('should throw an error whenever provider is not weedle but environment and url is not provided', () => {
      try {
        new WeedleApp({
          provider: {
            environment: 'ropsten',
            name: 'alchemy',
          },
        });
      } catch (e: any) {
        expect(e.message).toEqual('Missing or invalid provider credentials.');
      }
    });
  });
});
