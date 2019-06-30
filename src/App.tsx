import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStateModel, { GAMESTATE, WINNER } from './data/GameStateModel';
import Player from './data/Player';
import Die from './data/DieModel';
import PlayerInfo from './components/PlayerInfo';
import DamageDisplayTotal from './components/DamageDisplayTotal';
import ReactModel from 'react-modal';

interface Props { }
interface State {
  currentState: GAMESTATE;
  showModal: boolean;
}

class App extends Component<Props, State> {
  private mGameModel: GameStateModel;

  constructor(props) {
    super(props);

    this.mGameModel = new GameStateModel();

    this.state = {
      currentState: this.mGameModel.currentState,
      showModal: false,
    };
  }

  render() {
    const { human, enemyDamage, playerDamage, currentState } = this.mGameModel
    const playerScore = human.score;
    const playerDice = human.rolledDice;
    const showDamage = currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN;

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

        <div className="damage-display-total__container">
          { showDamage
            ? <DamageDisplayTotal damage={playerDamage} />
            : null
          }
        </div>

        <PlayerInfo
          isHuman={true}
          turn={this.mGameModel.turn}
          score={this.mGameModel.human.score}
          hp={this.mGameModel.human.hp}
          currentState={this.mGameModel.currentState}
          reset={this.reset}
          advance={this.advance}
        />

        <ReactModel
          className="win-modal"
          isOpen={this.state.showModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal}
          shouldFocusAfterRender={false}
          ariaHideApp={false}
        >
          <h1>{this.getWinMessage()}</h1>
        </ReactModel>
        { /*this.renderWinMessage()*/ }
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
    if (this.mGameModel.winner === WINNER.PLAYER) {
      return "You Win!";
    } else if (this.mGameModel.winner === WINNER.ENEMY) {
      return "You Lose!"
    } else {
      return "Tie!";
    }
  }

  private handleCloseModal = () => {
    this.setState({showModal: false});
  }
}


export default App;
