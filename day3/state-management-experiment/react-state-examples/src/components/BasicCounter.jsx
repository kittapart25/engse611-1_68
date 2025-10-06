import React, { useState } from 'react';

function BasicCounter() {
  // State เก็บค่าตัวเลข
  const [count, setCount] = useState(0);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        ตัวนับพื้นฐาน (useState)
      </h2>
      {/* แสดงค่า count */}
      <div className="text-6xl font-bold mb-8 text-gray-800">
        {count}
      </div>
      {/* ปุ่มควบคุม */}
      <div className="space-x-2 mb-6 flex flex-wrap justify-center">
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ลด (-1)
        </button>
        <button 
          onClick={() => setCount(0)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          รีเซ็ต
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          เพิ่ม (+1)
        </button>
        {/* ปุ่มใหม่ */}
        <button 
          onClick={() => setCount(count + 5)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          +5
        </button>
        <button 
          onClick={() => setCount(count + 10)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          +10
        </button>
      </div>
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> count = {count}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          คลิกปุ่ม → setCount() → Re-render → แสดงค่าใหม่
        </p>
      </div>
    </div>
  );
}

export default BasicCounter;