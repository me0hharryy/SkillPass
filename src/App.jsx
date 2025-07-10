import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Minting from './pages/Minting';
import WorkExperience from './pages/WorkExperience';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';
import './styles/theme.css';
import { WalletProvider } from './utils/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Minting />} />
          <Route path="/work" element={<WorkExperience />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;