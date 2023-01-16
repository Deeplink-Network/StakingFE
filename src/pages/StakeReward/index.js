import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeContract } from 'hooks/useContract';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import './index.scss';

const StakeReward = () => {
  const { account } = useWeb3React();
  const [reward, setReward] = useState(0);
  const [inter, setInter] = useState(null);
  const [stakedIDs, setStakedIDs] = useState([]);
  const [lastStakeTime, setLastStakeTime] = useState(0);

  const stakeContract = useStakeContract();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      getData();
      setInter(setInterval(() => getData(), 30000));
    }
    return () => {
      if (inter) {
        clearInterval(inter);
        setInter(null);
      }
    };
  }, [account]);

  const getData = async () => {
    const pending = await stakeContract.methods.pendingDeep(account).call();
    const userInfo = await stakeContract.methods.userInfo(account).call();
    setLastStakeTime(new Date(Number(userInfo.lastStakeTime) * 1000));

    try {
      const res = await stakeContract.methods.stakedNFTs(account, 0).call();
      if (res) {
        setStakedIDs([Number(res)]);
      }
    } catch (err) {}

    setReward(
      Number(
        BigNumber.from(pending).div(BigNumber.from(10).pow(16)).toString(),
      ) / 100.0,
    );
  };

  const handleClaim = async () => {
    await getData();

    stakeContract.methods
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

  const handleUnStake = async () => {
    if (stakedIDs.length > 0) {
      stakeContract.methods
        .withdraw(stakedIDs[0])
        .send({ from: account })
        .on('receipt', () => {
          toast.success('Your NFT has been withdrawn successfully.');
        })
        .on('error', () => {
          toast.error('Withdrawing NFT has been failed.');
        });
    }
  };

  const calcTimeDiff = () => {
    const diff = Math.floor((new Date().getTime() - lastStakeTime) / 1000.0);
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
    <div className="main-content stake-dkeeper">
      <h1>Staking Dkeeper</h1>
      {lastStakeTime !== 0 && <p>{`You staked ${calcTimeDiff()} ago`}</p>}

      <div className="stake-dkeeper__content">
        <p>Balance</p>
        <div className="stake-dkeeper__amount">{reward} Deep</div>

        <button disabled={reward === 0} onClick={() => handleClaim()}>
          Claim
        </button>
      </div>

      <a
        href={`https://testnet.bscscan.com/address/${account}`}
        target="_blank"
      >
        {account}
      </a>

      <button onClick={handleUnStake} disabled={stakedIDs.length === 0}>
        Unstake
      </button>
    </div>
  );
};

export default StakeReward;
