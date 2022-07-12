/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Provider } from '@ethersproject/abstract-provider';
// @ts-ignore
import * as ethers from 'ethers';
import type { ContractAble } from '../types/BaseTypes';
import type {
  EvmContractFuncArgs,
  EvmTransactionResponse,
} from '../types/EvmContractTypes';

class EvmContractAPI
  implements ContractAble<EvmContractFuncArgs, EvmTransactionResponse>
{
  runContractWriteFunction(
    options: EvmContractFuncArgs
  ): Promise<EvmTransactionResponse> {
    const contract = new ethers.Contract(
      options.contractAddress,
      options.abi,
      options.walletSignerOrProvider as ethers.providers.JsonRpcSigner
    );

    const call = contract[options.functionName];

    return options.params != null ? call(...options.params) : call();
  }

  runContractReadOnlyFunction(
    options: EvmContractFuncArgs
  ): Promise<EvmTransactionResponse> {
    const contract = new ethers.Contract(
      options.contractAddress,
      options.abi,
      options.walletSignerOrProvider as Provider
    );

    const call = contract[options.functionName];

    return options.params != null ? call(...options.params) : call();
  }
}

export default new EvmContractAPI();
