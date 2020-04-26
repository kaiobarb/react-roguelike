import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import Player from './Player';

const Rogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState(new Player(1, 1, 16))
  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = new Player();
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);
    setPlayer(newPlayer);
  }

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    // useEffect returns when this component exits. Time to dismount
    return() => {
      inputManager.unbindKeys();
      inputManager.unsubscribe();
    }
  });

  useEffect(() => {
    console.log('Draw');
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    player.draw(ctx);
  });
  return (
    <canvas
      ref={canvasRef}
      width={width * tileSize}
      height={height * tileSize}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Rogue;