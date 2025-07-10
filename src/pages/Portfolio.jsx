import React from 'react';
import '../components/dashboard.css';
import Portfolio from '../components/Portfolio';
import { useWallet } from '../utils/WalletContext';

const PortfolioPage = () => {
  const { account } = useWallet();
  return (
    <div className="two">
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Portfolio</h1>
        {!account ? (
          <div className="no-wallet-message">Wallet not connected. Please connect your wallet from the Home page.</div>
        ) : (
          <section className="dashboard-section">
            <Portfolio account={account} />
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage; 