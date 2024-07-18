// src/components/MoneyConverter.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MoneyConverter.css';


const MoneyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_YUouaxr8WT9aqXHk3omZQ8EitdG2HwMIhIbXu3Ky&base_currency=${fromCurrency}`)
        .then(response => {
          const rate = response.data.data[toCurrency];
          setConversionRate(rate);
          setResult((amount * rate).toFixed(2));
        })
        .catch(error => {
          console.error("Error fetching conversion rate", error);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setResult((e.target.value * conversionRate).toFixed(2));
  };

  return (
    <div className="money-converter">
      <h2>Money Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Amount"
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KRW">KRW</option>
        <option value="CNY">CNY</option>
        <option value="PHP">PHP</option>
        <option value="JPY">JPY</option>
        {/* Add more options as needed */}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="KRW">KRW</option>
        <option value="CNY">CNY</option>
        <option value="PHP">PHP</option>
        <option value="JPY">JPY</option>
        {/* Add more options as needed */}
      </select>
      <button onClick={() => setResult((amount * conversionRate).toFixed(2))}>Convert</button>
      {result && (
        <div>
          <h3>Conversion Result</h3>
          <p>{amount} {fromCurrency} = {result} {toCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default MoneyConverter;
