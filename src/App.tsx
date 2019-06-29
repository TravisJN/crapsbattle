import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel, { GAMESTATE, WINNER } from './data/GameStateModel';
import Player from './data/Player';
import Die from './data/DieModel';
import PlayerInfo from './components/PlayerInfo';

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
    const playerScore = this.mGameModel.human.score;
    const playerDice = this.mGameModel.human.rolledDice;
    return (
      <div className="App">
        <PlayerInfo
          isHuman={false}
          turn={this.mGameModel.turn}
          score={this.mGameModel.enemy.score}
          hp={this.mGameModel.enemy.hp}
          currentState={this.mGameModel.currentState}
          reset={this.reset}
          advance={this.advance}
        />
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
          lanes={this.mGameModel.lanes}
        />
        { this.renderWinMessage() }
        <PlayerInfo
          isHuman={true}
          turn={this.mGameModel.turn}
          score={this.mGameModel.human.score}
          hp={this.mGameModel.human.hp}
          currentState={this.mGameModel.currentState}
          reset={this.reset}
          advance={this.advance}
        />
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

  private advance = () => {
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

  private renderWinMessage() {
    if (this.mGameModel.winner === WINNER.PLAYER) {
      return (
        <h1 className="win-message">You Win!</h1>
      )
    } else if (this.mGameModel.winner === WINNER.ENEMY) {
      return (
        <h1>You Lose!</h1>
      )
    } else {
      return null;
    }
  }
}


export default App;
