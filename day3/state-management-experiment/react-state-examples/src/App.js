import React, { useState } from 'react';
import './App.css';

// Import ตัวอย่างทั้งหมด
import BasicCounter from './components/BasicCounter';
import NameChanger from './components/NameChanger';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import SimpleCalculator from './components/SimpleCalculator';
import CounterGame from './components/CounterGame';
import VotingSystem from './components/VotingSystem';
import NumberGuessing from './components/NumberGuessing';
import Stopwatch from './components/Stopwatch';
import SimpleChat from './components/SimpleChat';

function App() {
  // State สำหรับเลือกตัวอย่างที่จะแสดง
  const [activeExample, setActiveExample] = useState('counter');

  // ข้อมูลตัวอย่างทั้งหมด
  const examples = [
    {
      id: 'counter',
      title: '1. ตัวนับพื้นฐาน',
      description: 'เรียนรู้ useState เบื้องต้น',
      component: <BasicCounter />
    },
    {
      id: 'name',
      title: '2. การเปลี่ยนชื่อ',
      description: 'State กับ text input',
      component: <NameChanger />
    },
    {
      id: 'color',
      title: '3. เปลี่ยนสีพื้นหลัง',
      description: 'State เปลี่ยน UI',
      component: <ColorPicker />
    },
    {
      id: 'todo',
      title: '4. รายการงาน',
      description: 'Array State Management',
      component: <TodoList />
    },
    {
      id: 'calculator',
      title: '5. เครื่องคิดเลข',
      description: 'Multiple States',
      component: <SimpleCalculator />
    },
    {
      id: 'game',
      title: '6. เกมนับคะแนน',
      description: 'Complex State Logic',
      component: <CounterGame />
    },
    {
      id: 'voting',
      title: '7. ระบบโหวต',
      description: 'Voting System (State Object)',
      component: <VotingSystem />
    },
    {
      id: 'guess',
      title: '8. เกมทายตัวเลข',
      description: 'Number Guessing Game',
      component: <NumberGuessing />
    },
    {
      id: 'stopwatch',
      title: '9. นาฬิกาจับเวลา',
      description: 'Stopwatch (useRef, useState)',
      component: <Stopwatch />
    },
    {
      id: 'chat',
      title: '10. ระบบแชท',
      description: 'Simple Chat (Array State)',
      component: <SimpleChat />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🎓 React State Management Examples
          </h1>
          <p className="text-center text-gray-600 mt-2">
            ตัวอย่างประกอบการเรียน - หัวข้อที่ 3: State Management เบื้องต้น
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">เลือกตัวอย่าง:</h3>
              {examples.map(example => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`w-full text-left p-3 mb-2 rounded-lg transition-all ${
                    activeExample === example.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{example.title}</div>
                  <div className="text-sm opacity-75">{example.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {examples.find(ex => ex.id === activeExample)?.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;