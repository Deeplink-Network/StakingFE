// styles
import { useParams } from 'react-router-dom';
import './index.scss';

const AirdropWithdrawSuccess = () => {
  const param = useParams();

  return (
    <div className="main-content airdrop-withdrawal-success">
      <h1>Withdrawal Success</h1>
      <p>You successfully withdraw</p>

      <div className="airdrop-withdrawal-success__content">
        <div className="airdrop-withdrawal-success__amount">
          {param.reward || 0} Deep
        </div>
      </div>
    </div>
  );
};

export default AirdropWithdrawSuccess;
