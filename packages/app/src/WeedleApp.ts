import type { InitOptions } from './types';

export default class WeedleApp {
  isInitialized = false;
  constructor(private readonly _config: InitOptions) {
    if (this.validateAppConfig(_config)) {
      this.isInitialized = true;
    }
  }

  private verifyRpc({ rpc }: InitOptions): boolean {
    if (rpc && ((rpc?.chainId && !rpc?.url) || (!rpc?.chainId && rpc?.url))) {
      return false;
    }

    return true;
  }

  private verifyProvider({ provider }: InitOptions) {
    if (
      !provider?.name ||
      (provider?.name === 'weedle' && !provider?.appId) ||
      (provider?.name && !provider?.url && !provider.environment)
    ) {
      return false;
    }

    return true;
  }

  validateAppConfig = (config: InitOptions): boolean => {
    const { provider, rpc } = config;
    if (!rpc && !provider) {
      throw new Error(
        'Invalid credentials provided! Please pass provider or rpc configuration'
      );
    }

    if (!this.verifyRpc(config) && !this.verifyProvider(config)) {
      throw new Error(
        'Invalid credentials provided! Please pass provider or rpc configuration'
      );
    }

    if (provider && rpc) {
      throw new Error(
        'Please pass one of rpc or provider config and not both!'
      );
    }

    if (!rpc && !this.verifyProvider(config)) {
      throw new Error('Missing or invalid provider credentials.');
    }

    if (!provider && !this.verifyRpc(config)) {
      throw new Error(
        'Missing or invalid rpc credentials please provide both chainid and url'
      );
    }

    return true;
  };

  getConfig(): InitOptions {
    return this._config;
  }
}
