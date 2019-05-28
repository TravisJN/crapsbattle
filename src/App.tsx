import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel, { GAMESTATE } from './data/GameStateModel';
import Die from './data/DieModel';

interface Props { }
interface State {
  currentState: GAMESTATE;
  rolledDice: Die[];
}

class App extends Component<Props, State> {
  private mGameModel: GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();

    this.state = {
      currentState: this.mGameModel.currentState,
      rolledDice: this.mGameModel.rolledDice,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="enemy">
          enemy
        </div>
        <div className="board">
          <GameBoard
            rollDice={this.rollDice}
            rolledDice={this.state.rolledDice}
            totalPoints={this.mGameModel.points}
            currentTurn={this.mGameModel.turn}
            currentState={this.state.currentState}
            selectDie={this.selectDie}
            reset={this.reset}
            advance={this.advance}
        />
        </div>
        <div className="player">
          player
        </div>
      </div>
    );
  }

  private rollDice = () => {
    this.mGameModel.rollDice();
    this.setState({
        currentState: this.mGameModel.currentState,
        rolledDice: this.mGameModel.rolledDice,
    });
  }

  private selectDie = (index: number) => {
    this.mGameModel.rolledDice = this.mGameModel.rolledDice.map((aDie: Die, idx: number) => {
      if (idx === index) {
        aDie.selected = !aDie.selected;
      }
      return aDie;
    });

    this.setState({
      rolledDice: this.mGameModel.rolledDice
    });
  }

  private advance= () => {
    this.mGameModel.advance();
    this.setState({
      currentState: this.mGameModel.currentState,
      rolledDice: this.mGameModel.rolledDice,
    });
  }

  private reset = () => {
      this.mGameModel = new GameStateModel();
      this.setState({
        currentState: this.mGameModel.currentState,
        rolledDice: this.mGameModel.rolledDice,
      });
  }
}


export default App;
