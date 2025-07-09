import React from 'react';
import { useLocation } from 'react-router-dom';
import CredentialForm from './CredentialForm';
import Portfolio from './Portfolio';
import WorkForm from './WorkForm';
import WorkTimeline from './WorkTimeline';
import './dashboard.css';
const Dashboard = () => {
  const location = useLocation();
  const account = location.state?.account;

  return (
    <div className="min-h-screen w-full bg-[#1A1A1D]/80 backdrop-blur-lg flex justify-center items-start pt-12 text-white p-4">
      <div className="max-w-5xl mx-auto rounded-xl p-8 shadow-2xl" style={{ backgroundColor: '#3B1C32' }}>
        <h1 className="heading" style={{
            fontSize:'2.7rem'
        }}>Dashboard</h1>

        {account ? (
          <>
            <p className="text-sm text-gray-300 mb-6 text-center">✅ Connected as: <span className="font-mono">{account}</span></p>
            <hr/><br/>
            <section className="mb-12">
              <h2 className="heading">🎓 Credential  NFT  Minting</h2>
              <CredentialForm account={account} />
            </section>

            <section className="mb-12">
              <h2 className="heading">🧾 Your Skill Portfolio</h2>
              <Portfolio account={account} />
            </section>

            <section className="mb-12">
              <h2 className="heading">💼 Add Work Experience</h2>
              <WorkForm account={account} />
            </section>

            <section className="mb-6">
              <h2 className="heading">🕘 Work Timeline</h2>
              <WorkTimeline account={account} />
            </section>
          </>
        ) : (
          <p className="text-center text-gray-300">⚠️ Please connect your wallet from the home page.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;