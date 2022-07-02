import WeedleApp from '../index';
import type { InitOptions } from '../types';

const getConfig = (
  _config: InitOptions = {
    rpc: {
      url: 'http://localhost:8545',
      chainId: 1337,
    },
  }
): InitOptions => ({ ..._config });

describe('WeedleApp', () => {
  it('config should be valid when only rpc config is provided', () => {
    const weedleApp = new WeedleApp(getConfig());
    expect(weedleApp.isInitialized).toBeTruthy();
  });
});
