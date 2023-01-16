// styles
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useAirdropContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.scss';

const AirdropClaim = () => {
  const { account } = useWeb3React();
  const [reward, setReward] = useState(0);
  const [inter, setInter] = useState(null);
  const [lastClaimTime, setLastClaimTime] = useState(0);

  const navigate = useNavigate();
  const airdropContract = useAirdropContract();

  useEffect(() => {
    if (account) {
      getPendingDeep();
      setInter(setInterval(() => getPendingDeep(), 30000));
    }
    return () => {
      if (inter) {
        clearInterval(inter);
        setInter(null);
      }
    };
  }, [account]);

  const getPendingDeep = async () => {
    const pending = await airdropContract.methods.pendingDeep(account).call();
    const userInfo = await airdropContract.methods.userInfo(account).call();
    setLastClaimTime(Number(userInfo.lastClaimTime) * 1000);

    if (Number(pending) === 0) setReward(0);
    else {
      setReward(
        Number(
          BigNumber.from(pending).div(BigNumber.from(10).pow(16)).toString(),
        ) / 100.0,
      );
    }
  };

  const handleClaim = async () => {
    await getPendingDeep();

    airdropContract.methods
      .claim()
      .send({ from: account })
      .on('receipt', () => {
        toast.success('Your rewards has been claimed successfully.');
        navigate(`/airdrop-withdrawal-success/${reward}`);
      })
      .on('error', () => {
        toast.error('Claiming rewards has been failed.');
      });
  };

  const calcTimeDiff = () => {
    const diff = Math.floor((new Date().getTime() - lastClaimTime) / 1000.0);
    const dayOffset = Math.floor(diff / 3600 / 24);
    const hourOffset = Math.floor(diff / 3600);
    const minOffset = Math.floor(diff / 60);

    if (dayOffset > 0)
      return `${dayOffset} ${dayOffset === 1 ? 'day' : 'days'}`;
    if (hourOffset > 0)
      return `${hourOffset} ${hourOffset === 1 ? 'hour' : 'hours'}`;
    if (minOffset > 0)
      return `${minOffset} ${minOffset === 1 ? 'minute' : 'minutes'}`;
    return `${diff} ${diff === 1 ? 'second' : 'seconds'}`;
  };

  return (
    <div className="main-content airdrop-claim">
      <h1>Claim DEEP Airdrops</h1>
      {lastClaimTime !== 0 && <p>{`You claimed ${calcTimeDiff()} ago`}</p>}

      <div className="airdrop-claim__content">
        <p>Balance</p>
        <div className="airdrop-claim__amount">{reward} Deep</div>

        <button onClick={handleClaim}>Claim</button>
      </div>
    </div>
  );
};

export default AirdropClaim;
