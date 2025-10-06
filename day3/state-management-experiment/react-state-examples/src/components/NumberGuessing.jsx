import React, { useState } from 'react';

function NumberGuessing() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 20) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  const maxAttempts = 5;
  const handleGuess = () => {
    const num = Number(guess);
    if (!num || num < 1 || num > 20) {
      setMessage('กรุณาใส่เลข 1-20');
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const left = maxAttempts - nextAttempts;
    if (num === target) {
      setMessage(`ถูกต้อง! คุณทาย ${nextAttempts} ครั้ง`);
      setFinished(true);
    } else if (nextAttempts >= maxAttempts) {
      setMessage('ทายเกิน 5 ครั้ง! เริ่มเกมใหม่อัตโนมัติ');
      setTimeout(() => {
        handleRestart();
      }, 1200);
    } else if (num < target) {
      setMessage(`มากกว่านี้ | เหลืออีก ${left} ครั้ง`);
    } else {
      setMessage(`น้อยกว่านี้ | เหลืออีก ${left} ครั้ง`);
    }
  };

  const handleRestart = () => {
    setTarget(Math.floor(Math.random() * 20) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setFinished(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 rounded-2xl shadow-xl border-2 border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">🎲 เกมทายตัวเลข (1-20)</h2>
      <div className="mb-6 text-center">
        <input
          type="number"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          disabled={finished}
          className="p-3 border-2 border-green-300 rounded-xl text-lg w-32 text-center"
          placeholder="1-20"
        />
        <button
          onClick={handleGuess}
          disabled={finished}
          className="ml-4 px-6 py-3 rounded-xl font-bold shadow-md bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
        >
          ทาย
        </button>
      </div>
      <div className="text-lg text-center mb-4 min-h-[2em]">{message}</div>
      <div className="text-center">
        <button
          onClick={handleRestart}
          className="px-4 py-2 rounded-xl bg-gray-400 hover:bg-gray-600 text-white font-bold"
        >
          เริ่มใหม่
        </button>
      </div>
    </div>
  );
}

export default NumberGuessing;
