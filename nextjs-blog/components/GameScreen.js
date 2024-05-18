import React, { useEffect, useState } from 'react';
import ColorBox from './ColorBox';

const GameScreen = ({ onGameOver }) => {
  const [targetColor, setTargetColor] = useState('#ffffff');
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [steps, setSteps] = useState(0);
  const [isOshii, setOshii] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    const generateRandomColor = () => {
      const randomColor = `#${[0, 1, 2].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')}`;
      console.log(randomColor);
      setTargetColor(randomColor);
    };

    setTimeout(() => {
      generateRandomColor();
      console.log("start!")
    }, 300);

  }, []);

  useEffect(() => {
    if (isClear) {
      console.log("clear!")
      setTimeout(() => {
        onGameOver(steps);
      }, 100);
    }
  }, [isClear, onGameOver, steps]);

  useEffect(() => {
    const generateColorOptions = () => {
      const generateColor = (baseColor, offset) => {
        const base = baseColor.slice(1);
        const newColor = [0, 1, 2].map(i => {
          const value = parseInt(base.substr(i * 2, 2), 16);
          return Math.max(Math.min(value + offset[i], Math.floor(223 + Math.random() * 32)), Math.floor(Math.random() * 32)).toString(16).padStart(2, '0');
        }).join('');
        return `#${newColor}`;
      };

      let options = [];
      const currentRGB = currentColor.slice(1);
      const currentR = parseInt(currentRGB.substr(0, 2), 16);
      const currentG = parseInt(currentRGB.substr(2, 2), 16);
      const currentB = parseInt(currentRGB.substr(4, 2), 16);

      if (currentColor === '#ffffff') {
        options = [
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          '#ffffff',
          '#000000'
        ];
      } else if (currentColor === '#000000') {
        options = [
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          '#ffffff',
          '#000000'
        ];
      } else {
        options = [
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          generateColor(currentColor, [-Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200), -Math.floor(Math.random() * 200)]),
          '#ffffff',
          '#000000'
        ];
      }

      setColorOptions(options);
    };

    generateColorOptions();
  }, [currentColor]);

  const handleMixColor = (newColor) => {
    const mixColor = (color1, color2) => {
      const c1 = color1.slice(1);
      const c2 = color2.slice(1);
      const mixedColor = [0, 1, 2].map(i => {
        const value1 = parseInt(c1.substr(i * 2, 2), 16);
        const value2 = parseInt(c2.substr(i * 2, 2), 16);
        return Math.round((value1 + value2) / 2).toString(16).padStart(2, '0');
      }).join('');
      return `#${mixedColor}`;
    };

    const newMixedColor = mixColor(currentColor, newColor);
    setCurrentColor(newMixedColor);
    setSteps(prev => prev + 1);


    const targetRGB = targetColor.slice(1);
    const mixedRGB = newMixedColor.slice(1);
    const targetR = parseInt(targetRGB.substr(0, 2), 16);
    const targetG = parseInt(targetRGB.substr(2, 2), 16);
    const targetB = parseInt(targetRGB.substr(4, 2), 16);
    const mixedR = parseInt(mixedRGB.substr(0, 2), 16);
    const mixedG = parseInt(mixedRGB.substr(2, 2), 16);
    const mixedB = parseInt(mixedRGB.substr(4, 2), 16);
    console.log(targetR,targetG,targetB);
    console.log(mixedR,mixedG,mixedB);
    console.log(Math.abs(targetR - mixedR));
    console.log(Math.abs(targetG - mixedG));
    console.log(Math.abs(targetB - mixedB));

    if (Math.abs(parseInt(targetRGB.substr(0, 2), 16) - parseInt(mixedRGB.substr(0, 2), 16)) <= 30 &&
        Math.abs(parseInt(targetRGB.substr(2, 2), 16) - parseInt(mixedRGB.substr(2, 2), 16)) <= 30 &&
        Math.abs(parseInt(targetRGB.substr(4, 2), 16) - parseInt(mixedRGB.substr(4, 2), 16)) <= 30) {
      setIsClear(true);
    }
    else if(Math.abs(parseInt(targetRGB.substr(0, 2), 16) - parseInt(mixedRGB.substr(0, 2), 16)) <= 40 &&
    Math.abs(parseInt(targetRGB.substr(2, 2), 16) - parseInt(mixedRGB.substr(2, 2), 16)) <= 40 &&
    Math.abs(parseInt(targetRGB.substr(4, 2), 16) - parseInt(mixedRGB.substr(4, 2), 16)) <= 40){
      setOshii(true);
    }
    else{
      setOshii(false);
    }
  };

  return (
    <div className="container">
      <div>
        <div className={`oshiiText ${isOshii ? 'active' : ''}`}>もう少し！</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', paddingBottom: '30px' }}>
        
        <div>
          <div style={{ textAlign: 'center' }}>現在の色</div>
          <ColorBox color={currentColor} onClick={null}/>
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>この色を作ろう</div>
          <ColorBox color={targetColor} onClick={null}/>
        </div>
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>どの色を混ぜる？</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '220px', justifyContent: 'space-between' }}>
          {colorOptions.map((color, index) => (
            <ColorBox key={index} color={color} onClick={handleMixColor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
