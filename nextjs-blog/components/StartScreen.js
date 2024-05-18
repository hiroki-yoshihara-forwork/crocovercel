import React from 'react';
import RankingAccordion from './RankingAccordion';

const StartScreen = ({ onStart, onShowRanking }) => {
  return (
    <div className="container">
      <h1 className="gametitle">いろまぜまぜ</h1>
      <button onClick={onStart}>開始する</button>
      <RankingAccordion />
    </div>
  );
};

export default StartScreen;
