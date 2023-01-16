import { useWeb3React } from '@web3-react/core';
import { useDKeeperContract, useStakeContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNFTMintState } from 'state/hooks';
import { fetchNFTMintAsync } from 'state/nftmint';
import { getStakeAddress } from 'utils/addressHelpers';

// styles
import './index.scss';

const Stake = () => {
  const { account } = useWeb3React();
  const [ids, setIDs] = useState([]);
  const navigate = useNavigate();

  const stakeContract = useStakeContract();
  const nftContract = useDKeeperContract();
  const dispatch = useDispatch();
  const { owners } = useNFTMintState();

  useEffect(async () => {
    let length = await nftContract.methods.totalSupply().call();
    if (account) {
      dispatch(fetchNFTMintAsync(Number(length)));
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
    <div className="main-content stake">
      <h1>DKeeper</h1>
      {ids.length > 0 && (
        <h3>
          ID:{' '}
          {ids.map((it, idx) => {
            return (
              <>
                {it}
                {idx === ids.length - 1 ? '' : ', '}
              </>
            );
          })}
        </h3>
      )}
      <a
        href={`https://testnet.bscscan.com/address/${account}`}
        target="_blank"
      >
        {account}
      </a>

      <button onClick={() => handleStake()}>Stake DKeeper</button>
    </div>
  );
};

export default Stake;
