import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-2xl shadow-xl border-2 border-yellow-200">
      <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">⏱️ นาฬิกาจับเวลา (Stopwatch)</h2>
      <div className="text-5xl font-extrabold text-yellow-600 text-center mb-8">{time}s</div>
      <div className="flex justify-center gap-4">
        <button onClick={start} className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold">เริ่ม</button>
        <button onClick={stop} className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold">หยุด</button>
        <button onClick={reset} className="px-6 py-3 rounded-xl bg-gray-400 hover:bg-gray-600 text-white font-bold">รีเซ็ต</button>
      </div>
    </div>
  );
}

export default Stopwatch;
