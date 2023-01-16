import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { useDKeeperContract, useStakeContract } from 'hooks/useContract';
import { useNavigate, useParams } from 'react-router-dom';

import { getStakeAddress } from 'utils/addressHelpers';

// styles
import './index.scss';
import { useDispatch } from 'react-redux';
import { fetchNFTMintAsync } from 'state/nftmint';
import { useNFTMintState } from 'state/hooks';

const ContributeSuccess = () => {
  const params = useParams();
  const { account } = useWeb3React();
  const [ids, setIDs] = useState([]);
  const navigate = useNavigate();

  const stakeContract = useStakeContract();
  const nftContract = useDKeeperContract();
  const dispatch = useDispatch();
  const { owners } = useNFTMintState();

  useEffect(async () => {
    if (account) {
      dispatch(fetchNFTMintAsync());
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      const res = owners
        .map((it, index) => {
          if (String(it).toLowerCase() === String(account).toLowerCase()) {
            return index + 1;
          } else return 0;
        })
        .filter((it) => Number(it) !== 0);
      setIDs([...res]);
    }
  }, [owners, account]);

  const stakeNFT = () => {
    if (ids.length > 0) {
      stakeContract.methods
        .deposit(ids[0])
        .send({ from: account })
        .on('receipt', () => {
          toast.success('Staking NFT has been staked successfully.');
          navigate('/stake-reward');
        })
        .on('error', () => {
          toast.error('Staking NFT has been failed.');
          navigate('/stake-reward');
        });
    }
  };

  const handleStake = async () => {
    if (account) {
      const isApproved = await nftContract.methods
        .isApprovedForAll(account, getStakeAddress())
        .call();

      if (!isApproved) {
        nftContract.methods
          .setApprovalForAll(getStakeAddress(), true)
          .send({ from: account })
          .on('receipt', () => {
            stakeNFT();
          })
          .on('error', () => {
            toast.error('Approving NFT has been failed.');
          });
      } else {
        stakeNFT();
      }
    }
  };

  return (
    <div className="main-content stake-success">
      <h1>{Number(params.amt) === 0 ? 'Failed.' : 'Success.'}</h1>
      <h3>{`You contributed ${params.amt} ETH`}</h3>
      <a
        href={`https://testnet.bscscan.com/address/${account}`}
        target="_blank"
      >
        {account}
      </a>

      <div className="d-flex align-items-center stake-success__action">
        <button className="primary" onClick={() => navigate('/stake')}>
          View your DKeeper
        </button>
        <button onClick={() => handleStake()}>Stake DKeeper</button>
      </div>
    </div>
  );
};

export default ContributeSuccess;
