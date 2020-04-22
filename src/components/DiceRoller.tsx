import React, { Component } from 'react';
import './styles/diceRoller.css';
import DieComponent from './DieComponent';
import Die from '../data/DieModel';
import { GAMESTATE } from '../data/GameStateModel';
import Player from '../data/Player';


interface Props {
  rollDice: () => void;
  currentState: GAMESTATE;
  dice: Die[];
  selectDie: (index: number) => void;
  player: Player;
  advance?: () => void;
}

class DiceRoller extends Component<Props> {
  public render() {
    const { player, currentState, dice } = this.props;
    const isFighting: boolean = currentState === GAMESTATE.ANIMATING || currentState === GAMESTATE.ENDTURN || currentState === GAMESTATE.ENDGAME;

    let dieClass: string = player.isHuman ? "dice-roller__die-player" : "dice-roller__die-enemy";

    if (isFighting) {
      if (player.isHuman) {
        dieClass += " animate-player-ready";
      } else {
        dieClass += " animate-enemy-ready";
      }
    }

    return (
      <div className="dice-roller-container">
        <div className="dice-roller__dice-row">
          {dice.map((die: Die, idx: number) => {
            return (
              <div className={dieClass} key={"die-container-"+idx} onTransitionEnd={this.onAnimationEnd}>
                <div className="die-container__multiplier">
                  x2
                </div>
                <DieComponent
                  num={die.number}
                  idx={idx}
                  selected={die.selected}
                  onClick={this.onDieClicked}
                  key={"die"+idx}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  private onAnimationEnd = (a: any) => {
    // This callback gets called 18 times and I don't know why
    if (this.props.currentState === GAMESTATE.ANIMATING) {
      this.props.advance();
    }
  }

  private onDieClicked = (index: number) => {
    this.props.selectDie(index);
  }
}

export default DiceRoller;
