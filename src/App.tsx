import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel from './data/GameStateModel';
import DieModel from './data/DieModel';

interface Props { }
interface State {
    currentScore: number;
    currentTurn: number;
}

class App extends Component<Props, State> {
    private mGameModel: GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();

    this.state = {
        currentScore: 0,
        currentTurn: 1,
    }
  }

  render() {
    return (
      <div className="App">
        <div className="enemy">
          enemy
        </div>
        <div className="board">
          <GameBoard
            setRolledDice={this.setRolledDice}
            totalPoints={this.state.currentScore}
            currentTurn={this.state.currentTurn}
            currentState={this.mGameModel.currentState}
        />
        </div>
        <div className="player">
          player
        </div>
      </div>
    );
  }

  private setRolledDice = (rolledDice: DieModel[]) => {
    this.mGameModel.rolledDice = rolledDice;
    this.setState({
        currentScore: this.mGameModel.currentScore,
        currentTurn: this.mGameModel.turn,
    });
  }
}


export default App;
