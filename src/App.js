import React from 'react';
import Rogue from './components/Rogue';
import './App.css'


const App = () => (
  <div className="hero is-fullheight has-background-black">
    <div className=" container hero-head">
      <div className="title has-text-warning-dark">Roguelike</div>
    </div>
    {/* <div className="container hero-body"> */}
      <Rogue width={40} height={40} tileSize={16} />
    {/* </div> */}
    <div className="hero-foot"></div>
  </div>
)

export default App;
