import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useDKeeperContract } from 'hooks/useContract';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import './index.scss';

const Contribute = () => {
  const [isEnter, setIsEnter] = useState(false);
  const [checked, setChecked] = useState(false);
  const [amt, setAmt] = useState(0);
  const { account } = useWeb3React();
  const navigate = useNavigate();

  const dKeeperContract = useDKeeperContract();

  const handleContribute = () => {
    if (Number(amt) < 0.5 || Number(amt) > 2) {
      toast.error('Enter between 0.5 - 2 ETH.');
      return;
    }
    dKeeperContract.methods
      .publicMint(1)
      .send({
        from: account,
        value: BigNumber.from(Math.floor(amt * 100))
          .mul(BigNumber.from(10).pow(16))
          .toString(),
      })
      .on('receipt', () => {
        navigate(`/contribute-success/${amt}`);
      })
      .on('error', () => {
        toast.error('Minting DKeeperNFT has been failed.');

        navigate(`/contribute-success/${0}`);
      });
  };

  return (
    <div className="main-content contribute">
      <h1>Obtaining DKeeper</h1>
      <h3>
        Obtain a mutipurpose DKeeper for staking, able to run DeepNode, <br />
        access to R&D grants, Deeplink DAO and much more.{' '}
        <a href="https://www.deeplink.network/dkeeper" target="_blank">
          Read more:
        </a>
      </h3>
      <h5>
        All DKeeper holders will receive a weekly airdrop of DEEP ERC20 for the
        next 52 weeks.
      </h5>

      {!isEnter ? (
        <button onClick={() => setIsEnter(true)}>Contribute ETH</button>
      ) : (
        <input
          type="number"
          value={amt}
          onChange={(e) => setAmt(Number(e.target.value))}
        />
      )}

      <p>
        Min 0.5 ETH or 2 ETH max per address <br />
        Ticker: DKeeper (ERC721)
      </p>

      {isEnter && (
        <div className="contribute__agree-term">
          <div>
            <input
              type="checkbox"
              id="scales"
              name="agree-term"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label for="agree-term">
              I have read and I understand the risk.
            </label>
          </div>

          <button
            className="secondary"
            disabled={!checked}
            onClick={() => handleContribute()}
          >
            Enter
          </button>
        </div>
      )}
    </div>
  );
};

export default Contribute;
