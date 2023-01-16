import { BigNumber } from 'ethers';

export interface StakingState {
  balance?: BigNumber;
}

export interface MCRTState {
  balance?: BigNumber;
  bnbBalance?: BigNumber;
}
export interface NFTMintState {
  publicSale?: boolean;
  whitelistSale?: boolean;
  publicPrice?: BigNumber;
  whiteListPrice?: BigNumber;
}

export interface NFTMarketplaceState {
  inventoryNfts: [] | null;
  selectedNft: any;
  listedNfts: [] | null;
}

export interface State {
  staking: StakingState;
  mcrt: MCRTState;
  nftmint: NFTMintState;
  nftMarketplace: NFTMarketplaceState;
}
