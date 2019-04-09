import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

interface Props { }
interface State { }

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <div className="enemy">
          enemy
        </div>
        <div className="board">
          <GameBoard />
        </div>
        <div className="player">
          player
        </div>
      </div>
    );
  }
}

export default App;
