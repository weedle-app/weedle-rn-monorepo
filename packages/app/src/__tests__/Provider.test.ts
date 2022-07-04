import Providers from '../Providers';

describe('Providers', () => {
  let provider: typeof Providers;
  beforeEach(() => {
    provider = Providers;
  });
  describe('resolveRpcInfo', () => {
    it('should return default rpc details if config does not have one', async () => {
      const rpcInfo = await provider.resolveRpcInfo({});

      expect(rpcInfo).toMatchObject({
        chainId: 1337,
        rpcUrl: 'http://127.0.0.1:8545',
      });
    });

    it('should return correct rpc details when rpc config is provided', async () => {
      const rpcInfo = await provider.resolveRpcInfo({
        rpc: {
          chainId: 1337,
          url: 'http://127.0.0.1:8545',
        },
      });

      expect(rpcInfo).toMatchObject({
        chainId: 1337,
        rpcUrl: 'http://127.0.0.1:8545',
      });
    });

    it('should return correct rpc details when provider config is provided', async () => {
      const rpcInfo = await provider.resolveRpcInfo({
        provider: {
          name: 'weedle',
          url: 'http://127.0.0.1:8545',
          environment: 'ropsten',
        },
      });

      expect(rpcInfo).toMatchObject({
        chainId: 3,
        rpcUrl: 'http://127.0.0.1:8545',
      });
    });
  });
});
