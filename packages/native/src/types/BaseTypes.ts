/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import type { ethers } from 'ethers';

export interface ContractAble<T, R> {
  runContractWriteFunction(options: T): Promise<R>;
  runContractReadOnlyFunction(options: T): Promise<R>;
}

export interface BaseRunContractFuncArgs {
  contractAddress: string;
  functionName: string;
  params?: unknown[];
}
