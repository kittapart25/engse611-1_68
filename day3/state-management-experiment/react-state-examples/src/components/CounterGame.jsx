import React, { useState, useEffect } from 'react';

function CounterGame() {
  // Game States
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clickStreak, setClickStreak] = useState(0);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // ฟังก์ชันเริ่มเกม
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setMultiplier(1);
    setClickStreak(0);
    setIsGameActive(true);
  };

  // ฟังก์ชันเพิ่มคะแนน
  const addScore = (points) => {
    if (!isGameActive) return;
    const newScore = score + (points * multiplier);
    const newStreak = clickStreak + 1;
    setScore(newScore);
    setClickStreak(newStreak);
    // เลเวลอัพ
    const newLevel = Math.floor(newScore / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMultiplier(1 + (newLevel - 1) * 0.5);
    }
    // โบนัส streak
    if (newStreak % 10 === 0) {
      setScore(prev => prev + 50);
    }
    // high score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  // ฟังก์ชันจบเกม
  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-2xl shadow-xl border-2 border-purple-200">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 drop-shadow text-center">
        🎮 เกมนับคะแนน (Complex State Logic)
      </h2>
      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center shadow">
          <div className="text-3xl font-extrabold text-blue-600">{score}</div>
          <div className="text-base text-gray-600">คะแนน</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center shadow">
          <div className="text-3xl font-extrabold text-green-600">{highScore}</div>
          <div className="text-base text-gray-600">คะแนนสูงสุด</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center shadow">
          <div className="text-2xl font-bold text-purple-600">Lv.{level}</div>
          <div className="text-sm text-gray-600">เลเวล</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl text-center shadow">
          <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
          <div className="text-sm text-gray-600">เวลาเหลือ</div>
        </div>
      </div>
      {/* Multiplier & Streak */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-yellow-50 p-3 rounded-xl text-center">
          <div className="text-lg font-bold text-yellow-600">×{multiplier.toFixed(1)}</div>
          <div className="text-xs text-gray-600">ตัวคูณ</div>
        </div>
        <div className="bg-red-50 p-3 rounded-xl text-center">
          <div className="text-lg font-bold text-red-600">{clickStreak}</div>
          <div className="text-xs text-gray-600">คลิกต่อเนื่อง</div>
        </div>
      </div>
      {/* Game Controls */}
      {!isGameActive ? (
        <div className="text-center mb-8">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-5 rounded-xl font-extrabold text-2xl shadow-lg transition-all duration-200"
          >
            🚀 เริ่มเกม
          </button>
          {score > 0 && (
            <div className="mt-6 p-6 bg-white/80 rounded-xl border border-pink-100 shadow-inner">
              <p className="text-lg font-bold text-pink-600">เกมจบแล้ว!</p>
              <p>คะแนนรวม: <span className="text-purple-600 font-bold">{score}</span></p>
              <p>เลเวลสูงสุด: <span className="text-green-600 font-bold">{level}</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addScore(1)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-200"
            >
              +1 คะแนน
            </button>
            <button
              onClick={() => addScore(5)}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-200"
            >
              +5 คะแนน
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addScore(20)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-200"
            >
              +20 Power-up
            </button>
            <button
              onClick={() => addScore(50)}
              className="bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-200"
            >
              +50 Power-up
            </button>
          </div>
          <button
            onClick={() => addScore(10)}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-200"
          >
            +10 คะแนน (โบนัส!)
          </button>
          <button
            onClick={endGame}
            className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white py-2 rounded-xl font-bold shadow-md transition-all duration-200"
          >
            🛑 หยุดเกม
          </button>
        </div>
      )}
      {/* Game Rules - ปรับ layout ใหม่ */}
      <div className="bg-white/90 p-6 rounded-2xl mb-8 border border-purple-200 shadow-inner flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-bold mb-3 text-purple-700 text-lg flex items-center gap-2">
            <span role="img" aria-label="book">📖</span> กติกาเกม
          </h3>
          <ol className="list-decimal list-inside text-gray-700 text-base space-y-1 pl-2">
            <li><b>คลิกปุ่ม</b> เพื่อเก็บคะแนน <span className="text-blue-600 font-bold">ภายใน 30 วินาที</span></li>
            <li>ทุก <b>100 คะแนน</b> จะ <span className="text-purple-600 font-bold">เลเวลอัพ</span> และ <span className="text-yellow-600 font-bold">ตัวคูณเพิ่ม</span></li>
            <li>คลิกต่อเนื่อง <b>10 ครั้ง</b> รับ <span className="text-pink-600 font-bold">โบนัส 50 คะแนน</span></li>
            <li>ใช้ <span className="text-orange-500 font-bold">Power-up</span> (+20, +50) เพื่อเร่งคะแนน</li>
            <li className="text-green-700 font-bold">พยายามทำคะแนนสูงสุด!</li>
          </ol>
        </div>
        <div className="flex-1 min-w-[180px] bg-purple-50/80 rounded-xl p-4 border border-purple-100">
          <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2"><span role="img" aria-label="bulb">💡</span>Tips</h4>
          <ul className="text-sm text-gray-600 space-y-1 pl-2">
            <li>• คลิกเร็วขึ้นเพื่อเพิ่ม streak และรับโบนัส</li>
            <li>• วางแผนใช้ Power-up ให้เหมาะสม</li>
            <li>• จับตาเวลาที่เหลือ!</li>
          </ul>
        </div>
      </div>
      {/* State Debug Info */}
      <div className="bg-purple-50/80 p-4 rounded-xl border border-purple-100 shadow-inner">
        <p className="text-base font-semibold text-purple-700 mb-2">🔧 Complex States:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>score: {score}</div>
          <div>level: {level}</div>
          <div>timeLeft: {timeLeft}</div>
          <div>isGameActive: {isGameActive.toString()}</div>
          <div>multiplier: {multiplier}</div>
          <div>clickStreak: {clickStreak}</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Timer + Conditions + State Machine + useEffect
        </p>
      </div>
    </div>
  );
}

export default CounterGame;