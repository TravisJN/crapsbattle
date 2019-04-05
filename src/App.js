import React, { Component } from 'react';
import './App.css';
import DiceRoller from './components/diceRoller';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="enemy">
          enemy
        </div>
        <div className="board">
          <DiceRoller />
        </div>
        <div className="player">
          player
        </div>
      </div>
    );
  }
}

export default App;
