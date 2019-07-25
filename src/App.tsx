import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel, { GAMESTATE, WINNER } from './data/GameStateModel';
import Player from './data/Player';
import Die from './data/DieModel';
import PlayerInfo from './components/PlayerInfo';
import DamageDisplayTotal from './components/DamageDisplayTotal';

interface Props { }
interface State {
  currentState: GAMESTATE;
  showModal: boolean;
  isConnected: boolean;
}

class App extends Component<Props, State> {
  private mGameModel: GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();
    this.mGameModel.onFight = this.onUpdateState.bind(this);
    this.state = {
      currentState: this.mGameModel.currentState,
      showModal: false,
      isConnected: false,
    };
  }

  render() {
    const { human, enemyDamage, playerDamage, currentState } = this.mGameModel
    const playerScore = human.score;
    const playerDice = human.rolledDice;
    const showDamage = currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN;

    const { isConnected } = this.state;

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

        <div className="damage-display-total__container">
          { showDamage
            ? <DamageDisplayTotal damage={enemyDamage} />
            : null
          }
        </div>

        <GameBoard
          rollDice={this.rollDice}
          playerDice={playerDice}
          playerScore={playerScore}
          currentTurn={this.mGameModel.turn}
          currentState={this.state.currentState}
          selectDie={this.selectDie}
          advance={this.advance}
          players={this.mGameModel.players}
          lanes={this.mGameModel.lanes}
        />

        {
          isConnected
          ? null
          : <button className="join-game-button" onClick={this.onJoinGameClick}>Join game</button>
        }

        <div className="damage-display-total__container">
          { showDamage
            ? <DamageDisplayTotal damage={playerDamage} />
            : null
          }
        </div>

        <h1 className="win-message">{this.getWinMessage()}</h1>

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
    let showModal: boolean = false;
    if (this.mGameModel.currentState === GAMESTATE.ENDGAME) {
      this.reset();
    } else {
      this.mGameModel.advance();
      showModal = this.mGameModel.winner !== WINNER.NONE;
      this.setState({
        currentState: this.mGameModel.currentState,
        showModal,
      });
    }
  }

  private reset = () => {
      this.mGameModel = new GameStateModel();
      this.setState({
        currentState: this.mGameModel.currentState,
      });
  }

  private getWinMessage() {
    if (this.state.currentState === GAMESTATE.ENDGAME) {
      if (this.mGameModel.winner === WINNER.PLAYER) {
        return "You Win!";
      } else if (this.mGameModel.winner === WINNER.ENEMY) {
        return "You Lose!"
      } else {
        return "Tie!";
      }
    }
  }

  private onJoinGameClick = () => {
    this.mGameModel.socketConnection.joinGame().then(() => this.setState({isConnected: true}));
  }

  private onUpdateState() {
    this.setState({currentState: this.mGameModel.currentState});
  }
}

export default App;
