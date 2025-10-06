import React, { useState } from 'react';

function NameChanger() {
  // State เก็บชื่อที่ผู้ใช้พิมพ์
  const [name, setName] = useState('');

  // รายชื่อสุ่ม
  const randomNames = ['สมชาย', 'สมหญิง', 'John', 'Jane', 'Alex', 'มานี', 'ปิติ', 'Sakura', 'Liam', 'Emma'];
  const handleRandomName = () => {
    const random = randomNames[Math.floor(Math.random() * randomNames.length)];
    setName(random);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-2xl shadow-xl border-2 border-purple-200">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 drop-shadow text-center">
        ✨ การเปลี่ยนข้อความ (Text State)
      </h2>
      {/* Input Field */}
      <div className="mb-8">
        <label className="block text-base font-semibold mb-2 text-purple-700">
          พิมพ์ชื่อของคุณ:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-lg"
        />
      </div>
      {/* แสดงผลการทักทาย */}
      <div className="text-center bg-white/80 p-8 rounded-xl mb-8 border border-pink-100 shadow-inner">
        <h3 className="text-2xl font-bold">
          {name ? (
            <span className="text-pink-600">สวัสดี {name}! 👋</span>
          ) : (
            <span className="text-gray-400">กรุณาพิมพ์ชื่อของคุณ...</span>
          )}
        </h3>
      </div>
      {/* ปุ่มล้างข้อมูล + ปุ่มสุ่มชื่อ */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setName('')}
          disabled={!name}
          className={`px-5 py-3 rounded-xl font-bold shadow-md transition-all duration-200 ${
            name 
              ? 'bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้างชื่อ
        </button>
        <button
          onClick={handleRandomName}
          className="px-5 py-3 rounded-xl font-bold shadow-md bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white transition-all duration-200"
        >
          🎲 สุ่มชื่อ
        </button>
      </div>
      {/* แสดงข้อมูล State */}
      <div className="bg-purple-50/80 p-4 rounded-xl border border-purple-100 shadow-inner">
        <p className="text-base font-semibold text-purple-700">
          <strong>State:</strong> name = <span className="text-pink-600 font-bold">"{name}"</span>
        </p>
        <p className="text-base text-purple-700">
          <strong>ความยาว:</strong> {name.length} ตัวอักษร
        </p>
        <p className="text-xs text-gray-500 mt-1">
          พิมพ์ → onChange → setName() → Re-render
        </p>
      </div>
    </div>
  );
}

export default NameChanger;