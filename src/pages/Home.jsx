import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/home.css';
import companyLogo from '../assets/home.svg';
import { useWallet } from '../utils/WalletContext';

const Home = () => {
  const { account, setAccount } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install Metamask');
    }
    setIsLoading(false);
  };

  const goToMinting = () => {
    navigate('/mint');
  };

  return (
    <div className="futuristic-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="grid-overlay"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-card card-1">
          <div className="card-glow"></div>
          <span>⚡</span>
        </div>
        <div className="floating-card card-2">
          <div className="card-glow"></div>
          <span>🔗</span>
        </div>
        <div className="floating-card card-3">
          <div className="card-glow"></div>
          <span>💎</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="hero-section">
          {/* Glowing Orb */}
          <div className="glowing-orb" style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}></div>

          {/* Logo with Halo Effect */}
          <div className="logo-container">
            <div className="logo-halo"></div>
            <img src={companyLogo} alt="SkillPass Logo" className="logo-img" />
          </div>

          {/* Main Heading with Typing Effect */}
          <h1 className="futuristic-heading">
            <span className="typing-text">SkillPass</span>
          </h1>

          {/* Subtitle with Glow */}
          <p className="futuristic-subtitle">
            Mint Soulbound NFTs to prove your skills.<br />
            Log your freelance work history.<br />
            <span className="highlight">Own a permanent, verifiable Web3 resume.</span>
          </p>

          {/* Feature Cards */}
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Skill Verification</h3>
              <p>Prove your expertise with blockchain-backed credentials</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Work History</h3>
              <p>Immutable record of your freelance achievements</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Web3 Resume</h3>
              <p>Own your professional identity on the blockchain</p>
            </div>
          </div>

          {/* Enhanced Button or Status */}
          {!account ? (
            <button
              onClick={connectWallet}
              className={`futuristic-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <div className="btn-content">
                <span className="btn-icon">🦊</span>
                <span className="btn-text">
                  {isLoading ? 'Connecting...' : 'Authenticate Wallet'}
                </span>
              </div>
              <div className="btn-glow"></div>
            </button>
          ) : (
            <>
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
              </div>
              <button
                onClick={goToMinting}
                className="futuristic-btn"
                style={{ marginTop: '1.5rem' }}
              >
                Go to Minting
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="wave-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </div>
  );
};

export default Home; 