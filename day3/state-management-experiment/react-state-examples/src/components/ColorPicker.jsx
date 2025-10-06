import React, { useState } from 'react';

function ColorPicker() {
  // State เก็บสีที่เลือก
  const [selectedColor, setSelectedColor] = useState('blue');

  // ข้อมูสีที่ใช้ได้ (เพิ่มสีใหม่: ส้ม)
  const colors = [
    { name: 'ฟ้า', value: 'blue', bg: 'bg-blue-100', button: 'bg-blue-500' },
    { name: 'เขียว', value: 'green', bg: 'bg-green-100', button: 'bg-green-500' },
    { name: 'ชมพู', value: 'pink', bg: 'bg-pink-100', button: 'bg-pink-500' },
    { name: 'เหลือง', value: 'yellow', bg: 'bg-yellow-100', button: 'bg-yellow-500' },
    { name: 'ม่วง', value: 'purple', bg: 'bg-purple-100', button: 'bg-purple-500' },
    { name: 'ส้ม', value: 'orange', bg: 'bg-orange-100', button: 'bg-orange-500' },
  ];

  // หาข้อมูลสีปัจจุบัน
  const currentColor = colors.find(color => color.value === selectedColor);

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 rounded-2xl shadow-xl border-2 border-green-200">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-pink-500 drop-shadow text-center">
        🎨 เปลี่ยนสีพื้นหลัง (State + UI)
      </h2>
      {/* พื้นที่แสดงสีที่เลือก */}
      <div className={`${currentColor?.bg} border-4 border-green-200 rounded-2xl p-10 mb-8 text-center transition-all duration-300 shadow-lg`}> 
        <div className="text-4xl mb-2">🎨</div>
        <div className="text-2xl font-bold text-gray-800">
          สีที่เลือก: <span className="uppercase tracking-wider">{currentColor?.name}</span>
        </div>
      </div>
      {/* ปุ่มเลือกสี */}
      <div className="mb-8">
        <p className="text-base font-semibold mb-4 text-green-700">เลือกสีที่ต้องการ:</p>
        <div className="grid grid-cols-3 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`${color.button} hover:opacity-80 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md ${
                selectedColor === color.value ? 'ring-4 ring-green-300 scale-110' : ''
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      {/* ปุ่มสุ่มสี */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setSelectedColor(randomColor.value);
          }}
          className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all duration-200"
        >
          🎲 สุ่มสี
        </button>
        <button
          onClick={() => setSelectedColor('orange')}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all duration-200"
        >
          เลือกสีส้ม
        </button>
      </div>
      {/* แสดงข้อมูล State */}
      <div className="bg-green-50/80 p-4 rounded-xl border border-green-100 shadow-inner">
        <p className="text-base font-semibold text-green-700">
          <strong>State:</strong> selectedColor = <span className="text-pink-600 font-bold">"{selectedColor}"</span>
        </p>
        <p className="text-base text-green-700">
          <strong>CSS Class:</strong> {currentColor?.bg}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          คลิกสี → setSelectedColor() → เปลี่ยน className
        </p>
      </div>
    </div>
  );
}

export default ColorPicker;