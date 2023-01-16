import { useEffect, useState } from 'react';
import useWeb3 from './useWeb3';
import {
  getStakeAddress,
  getDKeeperAddress,
  getDeepTokenAddress,
  getAirdropAddress,
} from '../utils/addressHelpers';

import stakingContractJson from '../constants/ABI/Stake.json';
import dkeeperContractJson from '../constants/ABI/DKeeper.json';
import deepTokenContractJson from '../constants/ABI/DeepToken.json';
import airdopContractJson from '../constants/ABI/Airdrop.json';

const useContract = (abi, address, contractOptions = null) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions),
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions));
  }, [abi, address, contractOptions, web3]);

  return contract;
};

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useStakeContract = () => {
  return useContract(stakingContractJson.abi, getStakeAddress());
};

export const useDKeeperContract = () => {
  return useContract(dkeeperContractJson.abi, getDKeeperAddress());
};

export const useDeepTokenContract = () => {
  return useContract(deepTokenContractJson.abi, getDeepTokenAddress());
};

export const useAirdropContract = () => {
  return useContract(airdopContractJson.abi, getAirdropAddress());
};

export default useContract;
