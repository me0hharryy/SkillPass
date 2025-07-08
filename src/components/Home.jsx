import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import companyLogo from '../assets/home.svg'; // Adjust the path as necessary

const Home = () => {
  const [account, setAccount] = useState('');
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      navigate('/dashboard', { state: { account: accounts[0] } });
    } else {
      alert('Please install Metamask');
    }
  };

  return (
    <div className="one">
      <div className='text-center' >
        <img src={companyLogo} alt="SkillPass Logo" className="img" />
        <h1 className='heading'>SkillPass</h1>
        <p className='text'>Mint Soulbound NFTs to prove your skills.<br></br> Log your freelance work history.<br></br><br/>
        Build a permanent, verifiable Web3 resume owned by you.</p>
        <button
          onClick={connectWallet}
          className="btn"
        >
          Connect 
        </button>
      </div>
    </div>
  );
};

export default Home;