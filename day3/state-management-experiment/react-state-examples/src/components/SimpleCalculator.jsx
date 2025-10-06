import React, { useState } from 'react';

function SimpleCalculator() {
  // ตัวอย่างเครื่องคิดเลขง่าย ๆ
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div>
      <h2>Simple Calculator</h2>
      <input value={a} onChange={e => setA(e.target.value)} placeholder="0" type="number" />
      <input value={b} onChange={e => setB(e.target.value)} placeholder="0" type="number" />
      <button onClick={() => setResult(Number(a) + Number(b))}>+</button>
      <button onClick={() => setResult(Number(a) - Number(b))}>-</button>
      <button onClick={() => setResult(Number(a) * Number(b))}>*</button>
      <button onClick={() => setResult(Number(a) / Number(b))}>/</button>
      <div>Result: {result}</div>
    </div>
  );
}

export default SimpleCalculator;