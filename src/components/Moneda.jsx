import React, { useState, useEffect } from 'react';
import axios from 'axios';

 function Selector() {
  const [currencyData, setCurrencyData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    async function getCurrencyData() {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        setCurrencyData(data);
      } catch (error) {
        console.error(`Error al obtener los datos: ${error}`);
      }
    }

    getCurrencyData();
  }, []);

  useEffect(() => {
    if (currencyData && selectedCurrency) {
      const rate = currencyData.rates[selectedCurrency];
      const converted = amount * rate;
      setConvertedAmount(converted);
    }
  }, [currencyData, selectedCurrency, amount]);

  if (!currencyData) {
    return <p>Loading...</p>;
  }

  return (
      <div>
        <select onChange={(e) => setSelectedCurrency(e.target.value)}>
          {Object.entries(currencyData.rates).map(([currency, rate]) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
          ))}
        </select>
        <p>Amount:</p>
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <p>{convertedAmount}</p>
      </div>
  );
}export default Selector;