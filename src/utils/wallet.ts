// Set of helper functions to facilitate wallet setup
import { ExternalProvider } from '@ethersproject/providers';
import { nodes } from './getRpcUrl';

/**
 * Prompt the user to add Avalanche as a network on Metamask, or switch to Avalanche if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = (externalProvider || window.ethereum) as any;

  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '97', 10);
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      try {
        if (chainId === 56) {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                // chainId: `0x38`,
                chainId: `0x${chainId.toString(16)}`,
                chainName: 'BSC Mainnet',
                nativeCurrency: {
                  name: 'BSC mainnet',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: nodes,
                blockExplorerUrls: ['https://bscscan.com'],
              },
            ],
          });
        } else {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: 'BSC Testnet',
                nativeCurrency: {
                  name: 'BSC mainnet',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: nodes,
                blockExplorerUrls: ['https://testnet.bscscan.com'],
              },
            ],
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as any).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};
