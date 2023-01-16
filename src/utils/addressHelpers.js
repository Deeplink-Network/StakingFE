import { chainId } from 'config';

import stakeContractJson from '../constants/ABI/Stake.json';
import deepTokenContractJson from '../constants/ABI/DeepToken.json';
import dkeeperContractJson from '../constants/ABI/DKeeper.json';
import airdropContractJson from '../constants/ABI/Airdrop.json';
import multiCallContractJson from '../constants/ABI/MultiCall.json';

// const chainId = process.env.REACT_APP_CHAIN_ID;

export const getDeepTokenAddress = () => {
  return deepTokenContractJson.contract[chainId];
};

export const getStakeAddress = () => {
  return stakeContractJson.contract[chainId];
};

export const getDKeeperAddress = () => {
  return dkeeperContractJson.contract[chainId];
};

export const getAirdropAddress = () => {
  return airdropContractJson.contract[chainId];
};

export const getMulticallAddress = () => {
  return multiCallContractJson.contract[chainId];
};
