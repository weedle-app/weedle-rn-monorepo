import WeedleAuthProvider from '../WeedleAuthProvider';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/react-native-dapp';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@walletconnect/react-native-dapp', jest.fn());
jest.mock('@react-native-async-storage/async-storage', jest.fn());

const authProps = (opts = {}) => ({
  adapter: 'walletconnect',
  options: {
    redirectUrl: 'wex://app',
  },
  ...opts,
});

describe('<WeedleAuthProvider />', () => {
  it('should throw error when wrong adapter is provided', () => {
    try {
      WeedleAuthProvider({ ...authProps({ adapter: 'someAdapter' }) });
    } catch (e: any) {
      expect(e.message).toEqual(
        'Please provide a valid adapter type you wish to use.'
      );
    }
  });
});
