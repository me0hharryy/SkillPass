import React from 'react';
import '../components/dashboard.css';
import CredentialForm from '../components/CredentialForm';
import { useWallet } from '../utils/WalletContext';

const Minting = () => {
  const { account } = useWallet();
  return (
    <div className="two">
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Mint Credential NFT</h1>
        {!account ? (
          <div className="no-wallet-message">Wallet not connected. Please connect your wallet from the Home page.</div>
        ) : (
          <section className="dashboard-section">
            <CredentialForm account={account} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Minting; 