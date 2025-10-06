import React, { useState } from 'react';

function TodoList() {
  // State เก็บรายการงาน (Array of Objects) พร้อม category
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียน React.js', completed: false, category: 'เรียน' },
    { id: 2, text: 'ทำการบ้าน HTML', completed: true, category: 'การบ้าน' },
    { id: 3, text: 'ดู YouTube CSS', completed: false, category: 'พักผ่อน' }
  ]);

  // State เก็บข้อความใหม่
  const [newTodo, setNewTodo] = useState('');
  // State สำหรับ category ใหม่
  const [newCategory, setNewCategory] = useState('ทั่วไป');

  // ฟังก์ชันเพิ่มงานใหม่
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, { 
        id: newId, 
        text: newTodo.trim(), 
        completed: false,
        category: newCategory
      }]);
      setNewTodo('');
    }
  };

  // ปุ่มเพิ่ม todo ตัวอย่าง
  const addSampleTodo = () => {
    const samples = [
      { text: 'อ่านหนังสือ', category: 'เรียน' },
      { text: 'ออกกำลังกาย', category: 'สุขภาพ' },
      { text: 'เล่นเกม', category: 'พักผ่อน' },
      { text: 'ส่งงานโปรเจกต์', category: 'การบ้าน' }
    ];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    const newId = Math.max(...todos.map(t => t.id), 0) + 1;
    setTodos([...todos, { id: newId, text: sample.text, completed: false, category: sample.category }]);
  };

  // ฟังก์ชันลบงาน
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ฟังก์ชันเปลี่ยนสถานะงาน
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // คำนวณสถิติ
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 rounded-2xl shadow-xl border-2 border-orange-200">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-500 drop-shadow text-center">
        📝 รายการงาน (Array State)
      </h2>
      {/* สถิติ */}
      <div className="bg-yellow-50 p-4 rounded-xl mb-8 shadow-inner">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{totalCount}</div>
            <div className="text-sm text-gray-600">งานทั้งหมด</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">{totalCount - completedCount}</div>
            <div className="text-sm text-gray-600">ยังไม่เสร็จ</div>
          </div>
        </div>
      </div>
      {/* ฟอร์มเพิ่มงาน */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 p-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-lg"
        />
        <select
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="p-3 border-2 border-yellow-300 rounded-xl bg-yellow-50 text-yellow-700 font-semibold"
        >
          <option value="ทั่วไป">ทั่วไป</option>
          <option value="เรียน">เรียน</option>
          <option value="การบ้าน">การบ้าน</option>
          <option value="พักผ่อน">พักผ่อน</option>
          <option value="สุขภาพ">สุขภาพ</option>
        </select>
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className={`px-4 py-3 rounded-xl font-bold shadow-md transition-all duration-200 ${
            newTodo.trim()
              ? 'bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          เพิ่ม
        </button>
        <button
          onClick={addSampleTodo}
          className="px-4 py-3 rounded-xl font-bold shadow-md bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white transition-all duration-200"
        >
          🎲 เพิ่มตัวอย่าง
        </button>
      </div>
      {/* รายการงาน */}
      <div className="space-y-2 mb-8">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
              todo.completed ? 'bg-green-50 border-green-200' : 'bg-white/80 border-gray-200'
            } shadow-sm`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.text}
              <span className="ml-2 px-2 py-1 rounded bg-yellow-200 text-yellow-800 text-xs font-bold">{todo.category}</span>
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
      {/* แสดงข้อมูล State */}
      <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-100 shadow-inner">
        <p className="text-base font-semibold text-orange-700">
          <strong>Array State:</strong> todos.length = {todos.length}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          เพิ่ม → [...todos, newItem] | ลบ → filter() | แก้ไข → map()
        </p>
      </div>
    </div>
  );
}

export default TodoList;