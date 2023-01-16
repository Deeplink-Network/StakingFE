// styles
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ConnectorNames } from 'widgets/WalletModal';
import './index.scss';

const Airdrop = () => {
  const { login } = useAuth();
  const { account } = useWeb3React();
  const navigate = useNavigate();

  const handleSign = () => {
    if (account) {
      navigate('/airdrop-success');
    } else {
      login(ConnectorNames.Injected);
    }
  };

  return (
    <div className="main-content airdrop">
      <h1>Deep Airdrop</h1>
      <h3>
        Deeplink committed to distributing 90% of tokens to the ecosystem.
      </h3>
      <h5>Airdrop will begin on 15th December, 2022</h5>

      <button onClick={() => handleSign()}>Sign with your wallet</button>

      <p>Please make sure you have a secure ERC-20 wallet</p>
    </div>
  );
};

export default Airdrop;
