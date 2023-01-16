/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchMintStatus } from './fetchMint';

const initialState: any = {
  owners: [],
};

export const StakingSlice = createSlice({
  name: 'NFTMINT',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.owners = [...action.payload.owners];
    },
  },
});

// Actions
export const { setData } = StakingSlice.actions;

export const fetchNFTMintAsync = (length: Number) => async (dispatch: any) => {
  const { owners } = await fetchMintStatus(length);
  dispatch(
    setData({
      owners: owners,
    }),
  );
};

export default StakingSlice.reducer;
