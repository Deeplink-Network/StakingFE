import { useCallback } from 'react';
import { Contract } from 'web3-eth-contract';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useStakeContract } from './useContract';

const approve = async (
  tkContract: any,
  stakingContract: Contract,
  account: any,
) => {
  return tkContract.methods
    .approve(stakingContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });
};

// Approve a Farm
export const useApprove = (tkContract: Contract) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const stakingContract = useStakeContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tkContract, stakingContract, account);
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, tkContract, stakingContract]);

  return { onApprove: handleApprove };
};
