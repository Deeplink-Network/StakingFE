import { ReactComponent as ArrowBottomRight } from 'assets/arrow-bottom-right.svg';

// styles
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();

  const [showComing3, setShowComing3] = useState(false);
  const [showComing4, setShowComing4] = useState(false);
  const [showComing5, setShowComing5] = useState(false);
  const [showComing6, setShowComing6] = useState(false);

  return (
    <div className="main-content overview">
      <h1>Deeplink Ground</h1>
      <h3>Navigate all Deeplink protocol functions here</h3>

      <div className="d-flex flex flex-wrap overview__content">
        <div className="overview__item" onClick={() => navigate('/contribute')}>
          <h5>
            Obtaining <br /> DKeeper
          </h5>
          <p>
            Obtain a mutipurpose DKeeper for staking, running a DeepNode, access
            to R&D grants, Deeplink DAO services, governance, and more.
          </p>
          <ArrowBottomRight />
        </div>

        <div className="overview__item" onClick={() => navigate('/welcome')}>
          <h5>
            Staking <br /> DKeeper
          </h5>
          <p>
            Access to Deeplink DAO services, governance, and nodes. All DKeeper
            holders will receive a weekly airdrop of DEEP ERC20 Airdrop for up
            to 52 weeks.
          </p>

          <ArrowBottomRight />
        </div>

        {/* <div className="overview__item" onClick={() => navigate('/airdrop')}> */}
        <div className="overview__item" onClick={() => setShowComing6(true)}>
          <h5>
            Deep <br /> Airdrop
          </h5>
          <p>
            Deeplink is commited to distribute 90% of all tokens to the
            community and the protocol.
          </p>
          {showComing6 && (
            <p className="overview__coming">Begins 15th December, 2022</p>
          )}
          <ArrowBottomRight />
        </div>

        <div className="overview__item" onClick={() => setShowComing3(true)}>
          <h5>
            Running a <br /> DeepNode
          </h5>
          <p>
            Run a node with preloaded machine learning and deep learning
            modules.{' '}
          </p>
          {showComing3 && <p className="overview__coming">Coming Soon!</p>}
          <ArrowBottomRight />
        </div>

        <div className="overview__item" onClick={() => setShowComing4(true)}>
          <h5>
            Access R&D <br />
            Portal
          </h5>
          <p>
            UpWork-style platform where jobs are listed and anyone in the world
            can come, contribute to Deeplink community, and get paid for it.
          </p>
          {showComing4 && <p className="overview__coming">Coming Soon!</p>}
          <ArrowBottomRight />
        </div>

        <div className="overview__item" onClick={() => setShowComing5(true)}>
          <h5>
            Provide off-chain <br /> Computation
          </h5>
          <p>Provide peer-to-peer off-chain computation to Deeplink protocol</p>
          {showComing5 && <p className="overview__coming">Coming Soon!</p>}
          <ArrowBottomRight />
        </div>
      </div>
    </div>
  );
};

export default Landing;
