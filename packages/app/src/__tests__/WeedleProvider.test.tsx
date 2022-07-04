// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WeedleApp from '../WeedleApp';
import WeedleProvider from '../WeedleProvider';

const DummyComponent = () => null;

describe('WeedleProvider', () => {
  const client = new WeedleApp({
    rpc: { chainId: 1337, url: 'http://localhost:8545' },
  });
  test('should render component successfully', async () => {
    await waitFor(() => {
      render(
        <WeedleProvider client={client}>
          <DummyComponent />
        </WeedleProvider>,
        {}
      );
    });
    expect(true).toBeTruthy();
  });
});
