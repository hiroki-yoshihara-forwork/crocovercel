import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, useTick } from '@pixi/react';
import { useMemo,useReducer,useRef } from 'react';

const reducer = (_, { data }) => data;

const BunnyMove = () => {
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  useTick((delta) => {
    const i = (iter.current += 0.05 * delta);

    update({
      type: 'update',
      data: {
        x: Math.sin(i) * 100,
        y: Math.sin(i / 1.5) * 100,
        rotation: Math.sin(i) * Math.PI,
        anchor: Math.sin(i / 2),
      },
    });
  });

  return (<Sprite image="https://pixijs.io/pixi-react/img/bunny.png" {...motion} />);
};

  

const PixiPage = () => {
  return (
    <div>
      <h1>PixiJS Animation</h1>
      
      <Stage width={600} height={600} options={{ backgroundAlpha: 0 }}>
        <Container x={400} y={400}>
          <BunnyMove />
        </Container>
      </Stage>
    </div>
  );
};

export default PixiPage;