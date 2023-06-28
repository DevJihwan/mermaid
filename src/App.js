import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('ethereum');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [cryptoPrice, setCryptoPrice] = useState(null);

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,polygon,sui&vs_currencies=usd');
        setCryptoPrice(response.data);
      } catch (error) {
        console.error('Failed to fetch crypto price:', error);
      }
    };

    fetchCryptoPrice();
  }, []);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setToken('');
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      if (button.textContent.toLowerCase() === currency) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  };

  const handleTokenRequest = async () => {
    setLoading(true);
    setError('');
    setShowToken(false);

    try {
      // Simulating token request by sending a POST request to an API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT', {
        currency: selectedCurrency,
        walletAddress: token,
      });

      setShowToken(true);
    } catch (error) {
      setError('Failed to request token. Please try again.');
    }

    setLoading(false);
  };

  const renderButtons = () => {
    return (
      <div className="buttons">
        <button
          className={`button${selectedCurrency === 'ethereum' ? ' selected' : ''}`}
          onClick={() => handleCurrencySelect('ethereum')}
        >
          Ethereum
        </button>
        <button
          className={`button${selectedCurrency === 'polygon' ? ' selected' : ''}`}
          onClick={() => handleCurrencySelect('polygon')}
        >
          Polygon
        </button>
        <button
          className={`button${selectedCurrency === 'sui' ? ' selected' : ''}`}
          onClick={() => handleCurrencySelect('sui')}
        >
          SUI
        </button>
        
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Crypto Faucet</h1>
      {renderButtons()}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="walletAddress">Wallet Address</label>
        <input
          type="text"
          id="walletAddress"
          placeholder="Enter your wallet address"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button className="button" onClick={handleTokenRequest} disabled={loading}>
          {loading ? 'Loading...' : 'Get Test Token'}
        </button>
        {error && <p className="error">{error}</p>}
        {showToken && <p className="token show">Token: YOUR_TEST_TOKEN</p>}
      </form>
      <div className="container">
    
      {cryptoPrice && (
        <div className="prices">
          <h2>Current Prices</h2>
          <p>Ethereum: ${cryptoPrice.ethereum.usd}</p>
    
        </div>
      )}
    
  </div>
    </div>
  );
}

export default App;
