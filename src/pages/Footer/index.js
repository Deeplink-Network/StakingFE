import { ReactComponent as ArrowTopRight } from 'assets/arrow-top-right.svg';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer container">
      <div
        className="footer__text"
        onClick={() => window.open('https://www.deeplink.network')}
      >
        <span>Project Overview</span>
        <ArrowTopRight />
      </div>

      <div
        className="footer__text"
        onClick={() =>
          window.open('https://www.deeplink.network/documentation')
        }
      >
        <span>Documentation</span>
        <ArrowTopRight />
      </div>

      <div
        className="footer__text"
        onClick={() => window.open('https://www.deeplink.network/Deeplinkv1')}
      >
        <span>Deep v1.1</span>
        <ArrowTopRight />
      </div>
    </div>
  );
};

export default Footer;
