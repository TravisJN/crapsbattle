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

        switch(currentState) {
            case GAMESTATE.READY:
                return <button className="start-reset-button" onClick={this.props.advance}>Start</button>
            case GAMESTATE.ROLLING:
                return <button className="start-reset-button" onClick={this.props.advance}>Roll</button>
            case GAMESTATE.FIGHTING:
                return <button className="start-reset-button" onClick={this.props.advance}>Fight</button>
            case GAMESTATE.END:
            default:
                return <button className="start-reset-button" onClick={this.props.reset}>Reset</button>
        }
    }
}