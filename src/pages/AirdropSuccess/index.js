// styles
import { useWeb3React } from '@web3-react/core';
import { useAirdropContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const AirdropSuccess = () => {
  const { account } = useWeb3React();
  const [isListed, setIsListed] = useState(null);

  const airdropContract = useAirdropContract();
  const navigate = useNavigate();

  useEffect(async () => {
    if (account) {
      const res = await airdropContract.methods.userInfo(account).call();
      if (res && Number(res.alloc) != 0) {
        setIsListed(true);
        setTimeout(() => navigate('/airdrop-claim'), 5000);
      }
    }
  }, [account]);

  return (
    <div className="main-content airdrop-success">
      <h1>{isListed ? 'Success.' : 'Failed.'}</h1>
      <h2>You are{isListed ? '' : 'not'}&nbsp;whitelisted for Deep Airdrop</h2>

      <a
        href={`https://testnet.bscscan.com/address/${account}`}
        target="_blank"
      >
        {account}
      </a>
      {isListed === true && (
        <p>
          Airdrop will begin on 12:00:00 UTC, 15th of December, 2022 - 15th
          February, 2023
        </p>
      )}
    </div>
  );
};

export default AirdropSuccess;
