import { useEffect } from 'react';
import { ConnectorNames, connectorLocalStorageKey } from 'widgets/WalletModal';
import useAuth from 'hooks/useAuth';

const usePersistConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey,
    ) as ConnectorNames;

    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default usePersistConnect;
