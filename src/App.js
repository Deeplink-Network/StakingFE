import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './pages/Header';
import Footer from './pages/Footer';
import Airdrop from './pages/Airdrop';
import AirdropSuccess from './pages/AirdropSuccess';
import AirdropClaim from './pages/AirdropClaim';
import AirdropWithdrawSuccess from './pages/AirdropWithdrawSuccess';
import Stake from './pages/Stake';
import StakeReward from './pages/StakeReward';
import ContributeSuccess from './pages/ContributeSuccess';
import Overview from './pages/Overview';
import Contribute from './pages/Contribute';
import Landing from './pages/Landing';

import usePersistConnect from 'hooks/usePersistConnect';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  usePersistConnect();

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/airdrop" element={<Airdrop />} />

        <Route path="/airdrop-success" element={<AirdropSuccess />} />

        <Route path="/airdrop-claim" element={<AirdropClaim />} />

        <Route
          path="/airdrop-withdrawal-success/:reward"
          element={<AirdropWithdrawSuccess />}
        />

        <Route path="/stake" element={<Stake />} />

        <Route path="/stake-reward" element={<StakeReward />} />

        <Route path="/contribute" element={<Contribute />} />

        <Route
          path="/contribute-success/:amt"
          element={<ContributeSuccess />}
        />

        <Route path="/stake-withdrawal-success" element={<div />} />

        <Route path="/welcome" element={<Landing />} />

        <Route exact path="/" element={<Overview />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </HashRouter>
  );
}

export default App;
