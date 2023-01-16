import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import { ConnectorNames } from 'widgets/WalletModal';

// styles
import './index.scss';

const Landing = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="main-content landing">
      <h1>Stake DKeeper</h1>
      <h3> Connect your wallet to stake your DKeeper</h3>

      <p>
        Access to Deeplink DAO services, governance, and nodes. <br />
        All DKeeper holders will receive a weekly airdrop of DEEP ERC20 for up
        to 52 weeks.
      </p>

      <button onClick={() => login(ConnectorNames.Injected)}>
        Connect Your Wallet
      </button>

      <a href="https://www.deeplink.network/dkeepers" target="_blank">
        {' '}
        Don't have a DKeeper?
      </a>
    </div>
  );
};

export default Landing;
