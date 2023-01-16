import { BigNumber } from 'ethers';
import dkeeperContractJson from 'constants/ABI/DKeeper.json';
import multicall from 'utils/multicall';
import { getDKeeperAddress } from 'utils/addressHelpers';

export const fetchMintStatus = async (length: Number) => {
  let res: any;
  let params = new Array(length).fill(0).map((it, idx) => {
    return {
      address: getDKeeperAddress(),
      name: 'ownerOf',
      params: [idx + 1],
    };
  });
  res = await multicall(dkeeperContractJson.abi, params);
  res = res.map((it: any) => it[0]);

  return {
    owners: res,
  };
};
