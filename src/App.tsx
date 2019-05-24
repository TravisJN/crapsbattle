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
    private static InitialState: State = {
        currentScore: 0,
        currentTurn: 1,
    };

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();

    this.state = App.InitialState;
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
            reset={this.reset}
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

  private reset = () => {
      this.mGameModel = new GameStateModel();
      this.setState(App.InitialState);
  }
}


export default App;
