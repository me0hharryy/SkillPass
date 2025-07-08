import React, { useState } from 'react';
import { ethers } from 'ethers';
import CredentialForm from './components/CredentialForm';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Please install Metamask');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="text-3xl font-bold mb-6">SkillPass</header>
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-4">Connected as: {account}</p>
          <CredentialForm account={account} />
          <Portfolio account={account} />
        </div>
      )}
    </div>
  );
}

export default App;