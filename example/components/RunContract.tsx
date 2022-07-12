import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { ethers } from 'ethers';

import { useEvmNative } from '@weedle-app/native';
import { Authable, useWalletConnectAuth } from '@weedle-app/auth';

const RunContract = () => {
  const [contractAdd, setContractAdd] = useState<string>();
  const { runContractFunction } = useEvmNative();
  const weedleAuth: Authable = useWalletConnectAuth();

  useEffect(() => {
    const session = weedleAuth.getSession();
    console.log('address', session.accounts, session.connected);
  }, []);

  const mintNFT = async () => {
    /*  contractAddress: string;
    functionName: string;
    params?: unknown[]; 
    abi: string[];
    walletSigner?: ethers.providers.JsonRpcSigner;

    const args = [ethers.utils.parseEther("3.0")];
    const res = await (await contract["updatePrice"](...args)).wait();
    */
    console.log({ contractAdd, a: ethers.utils.parseEther('2.0') });
    const abi = ['function uri(uint256) public view virtual override returns (string memory)'];

    const options = {
      contractAddress: '0x4a4a91CA235c348c11d6912d11B1E1CD951351A3',
      // contractAdd.trim(),
      abi,
      functionName: 'uri',
      params: [ethers.utils.parseEther('3.0')],
    };

    try {
      const res = await (await runContractFunction(options)).wait();

      console.log({ res });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ marginTop: '10%', marginBottom: '10%' }}>
      <TextInput
        placeholder='Contract Address'
        style={{ borderWidth: 2, padding: 5, width: '100%', marginBottom: '4%' }}
        onChangeText={(e) => setContractAdd(e)}
      />
      <Button title='Call contract' onPress={mintNFT} />
    </View>
  );
};

export default RunContract;
