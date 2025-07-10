import React from 'react';
import '../components/dashboard.css';
import WorkForm from '../components/WorkForm';
import WorkTimeline from '../components/WorkTimeline';
import { useWallet } from '../utils/WalletContext';

const WorkExperience = () => {
  const { account } = useWallet();
  return (
    <div className="two">
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Work Experience</h1>
        {!account ? (
          <div className="no-wallet-message">Wallet not connected. Please connect your wallet from the Home page.</div>
        ) : (
          <>
            <section className="dashboard-section">
              <WorkForm account={account} />
            </section>
            <section className="dashboard-section">
              <WorkTimeline account={account} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkExperience; 