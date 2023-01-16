import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, NFTMintState } from 'state/types';

export const useNFTMintState = (): NFTMintState => {
  const nftmintState = useSelector((state: State) => state.nftmint);
  return nftmintState;
};
