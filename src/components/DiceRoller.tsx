import React, { Component } from 'react';
import './diceRoller.css';
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
}

class DiceRoller extends Component<Props> {
  public render() {
    const { player, currentState, dice } = this.props;
    const isAnimating: boolean = currentState === GAMESTATE.ANIMATING;

    if (!player.isHuman) {
      if (currentState === GAMESTATE.ROLLING) {
        return (
          <div className="dice-roller-container">
            <p className="dice-roller__enemy-text">Rolling...</p>
          </div>
        )
      } else if (currentState === GAMESTATE.FIGHTING) {
        return (
          <div className="dice-roller-container">
            <p className="dice-roller__enemy-text">Ready to fight!</p>
          </div>
        )
      }
    }

    let dieClass: string = "dice-roller__die-";

    return (
      <div className="dice-roller-container">
        <div className="dice-roller__dice-row">
          {dice.map((die: Die, idx: number) => {
            return (
              <div className={"dice-roller__die"} key={"die-container-"+idx}>
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

  private onDieClicked = (index: number) => {
    this.props.selectDie(index);
  }
}

export default DiceRoller;
