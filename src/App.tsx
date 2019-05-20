import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel from './data/GameStateModel';

interface Props { }
interface State { }

class App extends Component<Props, State> {
  private mGameModel:  GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();
  }

  render() {
    return (
      <div className="App">
        <div className="enemy">
          enemy
        </div>
        <div className="board">
          <GameBoard gameModel={this.mGameModel} />
        </div>
        <div className="player">
          player
        </div>
      </div>
    );
  }
}

export default App;
