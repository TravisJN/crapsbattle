import React, { Component } from 'react';
import './styles/DamageDisplayTotal.css';
import { GAMESTATE } from '../data/GameStateModel'; // This is the class, not an instance

interface Props {
    damage: number;
    currentState: GAMESTATE;
}

class DamageDisplayTotal extends Component<Props>{
    render() {
        const { currentState } = this.props;

        if (currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN) {
            return (
                <div className="damage-display-total__container">
                    <h1 className="damage-display-total__damage-text">{this.props.damage}</h1>
                </div>
            );
        } else {
            return (
                <div className="damage-display-total__container">
                    <h1 className="damage-display-total__damage-text">Roll the dice...</h1>
                </div>
            );
        }
    }
}

export default DamageDisplayTotal;