import React, { Component } from 'react';
import { GAMESTATE } from '../data/GameStateModel';
import './styles/PlayerInfo.css';

interface Props {
  hp: number;
  currentState: GAMESTATE;
  reset: ()=>void;
  advance: ()=>void;
  isHuman: boolean;
  maxHp: number;
}


export default class PlayerInfo extends Component<Props> {
  render() {
    if (this.props.isHuman) {
      return (
        <div className="player">
          {/* <p>hp: {this.props.hp}</p> */}
          {this.renderHpBar()}

          { this.renderButton() }
        </div>
      )
    } else {
        return (
          <div className="player">
            <p>Enemy</p>
            {this.renderHpBar()}
          </div>
        )
    }
  }

  private renderHpBar = () => {
    const { hp, maxHp } = this.props;
    const hpNum = hp < 0 ? 0 : hp;
    const percentFill: number = (hpNum/maxHp) * 100;

    return (
      <div className="hp-bar-container">
        <div className="hp-bar-fill" style={{width: percentFill+"%"}}></div>
        <p className="hp-bar-text">{hpNum}/{maxHp}</p>
      </div>
    )
  }

  private renderButton = () => {
    const { currentState } = this.props;
    const isDisabled = currentState === GAMESTATE.WAITING_TO_FIGHT
                      || currentState === GAMESTATE.STARTGAME
                      || currentState === GAMESTATE.CONNECTING
                      || currentState === GAMESTATE.ENDGAME;
    let buttonText: string;

    switch(currentState) {
      case GAMESTATE.STARTGAME:
      case GAMESTATE.READY:
        buttonText = "Start";
        break;
      case GAMESTATE.ROLLING:
        buttonText = "Roll";
        break;
      case GAMESTATE.FIGHTING:
        buttonText = "Fight";
        break;
      case GAMESTATE.ENDTURN:
        buttonText = "Next Turn";
        break;
      default:
        buttonText = "Start";
        break;
    }

    return <button className="start-reset-button" onClick={this.props.advance} disabled={isDisabled}>{buttonText}</button>
  }
}