import React from 'react';
import { useLocation } from 'react-router-dom';
import CredentialForm from './CredentialForm';
import Portfolio from './Portfolio';
import WorkForm from './WorkForm';
import WorkTimeline from './WorkTimeline';

const Dashboard = () => {
  const location = useLocation();
  const account = location.state?.account;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">SkillPass Dashboard</h1>
      {account ? (
        <>
          <p className="mb-4">Connected as: {account}</p>
          <CredentialForm account={account} />
          <Portfolio account={account} />
          <WorkForm account={account} />
          <WorkTimeline account={account} />
        </>
      ) : (
        <p>Please connect your wallet from the home page.</p>
      )}
    </div>
  );
};

export default Dashboard;