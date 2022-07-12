/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import type { ethers } from 'ethers';
import type {
  TransactionResponse,
  Provider,
} from '@ethersproject/abstract-provider';

import type { BaseRunContractFuncArgs } from './BaseTypes';

export interface EvmContractFuncArgs extends BaseRunContractFuncArgs {
  abi: string[];
  walletSignerOrProvider?: ethers.providers.JsonRpcSigner | Provider;
}

export type EvmTransactionResponse = TransactionResponse & any;
