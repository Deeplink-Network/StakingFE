import { useCallback, useEffect } from 'react';
import { UnsupportedChainIdError } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { toast } from 'react-toastify';
import { ConnectorNames, connectorLocalStorageKey } from 'widgets/WalletModal';
import { connectorsByName } from 'utils/web3React';
import { setupNetwork } from 'utils/wallet';
import { useAppDispatch } from 'state';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

const activateInjectedProvider = (connectorID: ConnectorNames) => {
  const { ethereum } = window;
  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (connectorID) {
    case 'walletlink':
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }) => isCoinbaseWallet,
      );
      break;
    case 'injected':
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
  }

  if (provider && ethereum) {
    ethereum?.setSelectedProvider(provider);
  }
};

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { chainId, activate, deactivate } = useActiveWeb3React();

  const login = useCallback(async (connectorID: ConnectorNames) => {
    activateInjectedProvider(connectorID);

    const connectorOrGetConnector = connectorsByName[connectorID];
    const connector =
      typeof connectorOrGetConnector !== 'function'
        ? connectorsByName[connectorID]
        : await connectorOrGetConnector();

    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const provider = await connector.getProvider();
          const hasSetup = await setupNetwork(provider);
          if (hasSetup) {
            activate(connector);
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey);
          if (
            error instanceof NoEthereumProviderError ||
            error instanceof NoBscProviderError
          ) {
            console.log('Provider Error', 'No provider was found');
            toast.error('No provider was found');
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector;
              walletConnector.walletConnectProvider = undefined;
            }
            console.log(
              'Authorization Error',
              'Please authorize to access your account',
            );
            toast.error('Please authorize to access your account');
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            console.log(error.name, error.message);
            toast.error(error.message);
          }
        }
      });
    } else {
      console.log("Can't find connector", 'The connector config is wrong');
      console.log('The connector config is wrong');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate, dispatch, chainId]);

  useEffect(() => {
    if (chainId === undefined) {
      window.localStorage.removeItem(connectorLocalStorageKey);
      deactivate();
    }
  }, []);

  return { login, logout };
};

export default useAuth;
