import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const RankingAccordion = () => {
  const [ranking, setRanking] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRanking = async () => {
      const rankingRef = db.collection('ranking').orderBy('steps').limit(100);
      const snapshot = await rankingRef.get();
      const rankingData = snapshot.docs.map(doc => doc.data());
      setRanking(rankingData);
    };
    fetchRanking();
  }, []);

  return (
    <div className="accordion">
      <button onClick={() => setIsOpen(!isOpen)}>ランキング</button>
      <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
        {ranking.map((entry, index) => (
          <div key={index} style={{ paddingTop: '10px' }}>
            <span>{index + 1}位: </span>
            <span>{entry.playerName} <br></br> </span>
            <span>かかった回数： {entry.steps}回</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingAccordion;
