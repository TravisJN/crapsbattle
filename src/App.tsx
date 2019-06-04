import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel, { GAMESTATE } from './data/GameStateModel';
import Player from './data/Player';
import Die from './data/DieModel';

interface Props { }
interface State {
  currentState: GAMESTATE;
}

class App extends Component<Props, State> {
  private mGameModel: GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();

    this.state = {
      currentState: this.mGameModel.currentState,
    };
  }

  render() {
    const playerScore = this.mGameModel.players[0].currentScore;
    const playerDice = this.mGameModel.players[0].rolledDice;
    return (
      <div className="App">
        <div className="enemy">
          enemy
          <p>Turn: {this.mGameModel.turn}</p>
          <p>Score: {this.mGameModel.players[1].currentScore}</p>
          <p>hp: {this.mGameModel.players[1].hp}</p>
        </div>
        <GameBoard
          rollDice={this.rollDice}
          playerDice={playerDice}
          playerScore={playerScore}
          currentTurn={this.mGameModel.turn}
          currentState={this.state.currentState}
          selectDie={this.selectDie}
          reset={this.reset}
          advance={this.advance}
          players={this.mGameModel.players}
        />
        <div className="player">
          <p>Turn: {this.mGameModel.turn}</p>
          <p>Score: {this.mGameModel.players[0].currentScore}</p>
          <p>hp: {this.mGameModel.players[0].hp}</p>
          { this.mGameModel.currentState === GAMESTATE.READY
            ? <button className="start-reset-button" onClick={this.advance}>Start</button>
            : <button className="start-reset-button" onClick={this.reset}>Reset</button>
          }
        </div>
      </div>
    );
  }

  private rollDice = () => {
    this.mGameModel.rollDice();
    this.setState({
        currentState: this.mGameModel.currentState,
    });
  }

  private selectDie = (index: number) => {
    const player: Player = this.mGameModel.players.find((player) => player.isHuman);

    player.rolledDice = player.rolledDice.map((aDie: Die, idx: number) => {
      if (idx === index) {
        aDie.selected = !aDie.selected;
      }
      return aDie;
    });

    this.setState({
      currentState: this.mGameModel.currentState,
    });
  }

  private advance= () => {
    this.mGameModel.advance();
    this.setState({
      currentState: this.mGameModel.currentState,
    });
  }

  private reset = () => {
      this.mGameModel = new GameStateModel();
      this.setState({
        currentState: this.mGameModel.currentState,
      });
  }
}


export default App;
