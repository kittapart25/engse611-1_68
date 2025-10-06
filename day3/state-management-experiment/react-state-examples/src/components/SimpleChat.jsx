import React, { useState, useRef, useEffect } from 'react';

function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, time: new Date().toLocaleTimeString() }]);
      setInput('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-xl border-2 border-pink-200 h-[500px] flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">💬 ระบบแชท (Simple Chat)</h2>
      <div className="flex-1 overflow-y-auto bg-white/80 rounded-xl p-4 mb-4 border border-pink-100 shadow-inner">
        {messages.length === 0 && <div className="text-gray-400 text-center">ยังไม่มีข้อความ</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 flex flex-col items-start">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl font-medium shadow-sm">{msg.text}</span>
            <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-lg"
          placeholder="พิมพ์ข้อความ..."
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}

export default SimpleChat;
