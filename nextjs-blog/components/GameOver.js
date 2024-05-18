import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const GameOver = ({ steps, onRestart }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const checkHighScore = async () => {
      const rankingRef = db.collection('ranking').orderBy('steps', 'desc').limit(1);
      const snapshot = await rankingRef.get();
      const worstRank = snapshot.docs[0].data();

      if (steps < worstRank.steps) {
        setIsHighScore(true);
        setShowInput(true);
      }
    };

    checkHighScore();
  }, [steps]);

  const handleSave = async () => {
    await db.collection('ranking').add({
      playerName: playerName,
      steps: steps
    });
    onRestart();
  };

  return (
    <div className="container">
      <h1>Congratulation!!</h1>
      {isHighScore ? (
        <>
          <h2>ランクインおめでとう!!!</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength="10"
            placeholder="プレイヤーネーム"
          />
          <button onClick={handleSave}>送信する</button>
        </>
      ) : (
        <>
          <h2>今回の順位はランキング外でした！</h2>
          <button onClick={onRestart}>スタート画面に戻る</button>
        </>
      )}
    </div>
  );
};

export default GameOver;
