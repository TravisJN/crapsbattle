import React, { Component } from 'react';
import { GAMESTATE } from '../data/GameStateModel';

interface Props {
  turn: number;
  score: number;
  hp: number;
  currentState: GAMESTATE;
  reset: ()=>void;
  advance: ()=>void;
  isHuman: boolean;
}


export default class PlayerInfo extends Component<Props> {
  render() {
    if (this.props.isHuman) {
      return (
        <div className="player">
          <p>Turn: {this.props.turn}</p>
          <p>Score: {this.props.score}</p>
          <p>hp: {this.props.hp}</p>

          { this.renderButton() }
        </div>
      )
    } else {
        return (
          <div className="player">
            <p>Enemy</p>
            <p>Score: {this.props.score}</p>
            <p>hp: {this.props.hp}</p>
          </div>
        )
    }
  }

    private renderButton = () => {
      const { currentState } = this.props;
      let buttonText: string;

      switch(currentState) {
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
        case GAMESTATE.ENDGAME:
        default:
          buttonText = "Reset";
          break;
      }

      return <button className="start-reset-button" onClick={this.props.advance}>{buttonText}</button>
    }
}