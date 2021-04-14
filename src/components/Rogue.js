import React, { useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';
import World from './World';
import Spawner from './Spawner';

const Rogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  //const [player, setPlayer] = useState(new Player(1, 1, 16))
  const [world, setWorld] = useState(new World(width, height, tileSize))
  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  useEffect(() => {
    console.log("Create Map!");
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    setWorld(newWorld);
    let spawner = new Spawner(world);
    spawner.spawnLoot(10);
    spawner.spawnMonsters(6);
    spawner.spawnStairs();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    // useEffect returns when this component exits. Time to dismount
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe();
    }
  });

  useEffect(() => {
    console.log('Draw');
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    ctx.imageSmoothingEnabled = false; // disable smoothing for crisp pixelart
    world.draw(ctx);
  });

  return (
    <div className='columns'>
      <div className='column is-4'></div>
      <div className='column is-4'>
        <canvas
          ref={canvasRef}
          width={width * tileSize}
          height={height * tileSize}
          style={{ border: '1px solid black', background: 'DimGrey', imageRendering: 'pixelated' }}
        />
      </div>
      <div className='column is-2'>
        <div className='columns is-multiline'>
          <div className='column is-12'>
            <span className='tag is-dark'>Health</span>
            <progress class="progress is-small is-danger" value="90" max="100">90%</progress>
          </div>
          <div className='column'>
            <article className="panel is-dark" style={{ overflow: 'auto', height: width * tileSize + 'px' }}>
              <p className="panel-heading" >
                Log
            </p>


              {world.history.map((item, index) =>
                (<div className='panel-block has-background-info-dark' key={index}>{item}</div>)
              )}
            </article>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Rogue;