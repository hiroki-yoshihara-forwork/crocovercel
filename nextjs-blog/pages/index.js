import React, { useState } from 'react';
import StartScreen from '../components/StartScreen';
import GameScreen from '../components/GameScreen';
import GameOver from '../components/GameOver';

const ColorGame = () => {
  const [screen, setScreen] = useState('start');
  const [steps, setSteps] = useState(0);

  const handleStart = () => setScreen('game');
  const handleGameOver = (steps) => {
    setSteps(steps);
    setScreen('gameover');
  };
  const handleRestart = () => setScreen('start');

  return (
    <>
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'game' && <GameScreen onGameOver={handleGameOver} />}
      {screen === 'gameover' && <GameOver steps={steps} onRestart={handleRestart} />}
    </>
  );
};

export default ColorGame;
