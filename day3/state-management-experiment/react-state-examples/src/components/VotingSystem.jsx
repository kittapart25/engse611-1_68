import React, { useState } from 'react';

function VotingSystem() {
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0 });
  const [voted, setVoted] = useState(false);

  const handleVote = (option) => {
    if (voted) return;
    setVotes({ ...votes, [option]: votes[option] + 1 });
    setVoted(true);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-2xl shadow-xl border-2 border-blue-200">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">📊 ระบบโหวต (Voting System)</h2>
      <div className="flex flex-col gap-4 mb-6">
        {Object.keys(votes).map(option => (
          <button
            key={option}
            onClick={() => handleVote(option)}
            disabled={voted}
            className={`px-6 py-3 rounded-xl font-bold shadow-md transition-all duration-200 ${voted ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            โหวต {option}
          </button>
        ))}
      </div>
      <div className="bg-white/80 p-4 rounded-xl border border-blue-100 shadow-inner">
        <h3 className="font-bold mb-2 text-blue-700">ผลโหวต:</h3>
        <ul className="text-lg">
          {Object.entries(votes).map(([option, count]) => (
            <li key={option}>{option}: <span className="font-bold text-blue-600">{count}</span> คะแนน</li>
          ))}
        </ul>
      </div>
      {voted && <div className="mt-4 text-green-600 font-bold text-center">ขอบคุณที่ร่วมโหวต!</div>}
    </div>
  );
}

export default VotingSystem;
