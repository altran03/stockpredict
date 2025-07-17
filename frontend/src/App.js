import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error connecting to backend');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Stock Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
