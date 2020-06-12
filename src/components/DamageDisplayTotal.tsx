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
        let damageText: string | number;

        if (currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN) {
            damageText = this.props.damage;
        } else if (currentState === GAMESTATE.FIGHTING) {
            damageText = 'Ready to Fight!';
        } else if (currentState === GAMESTATE.READY || currentState === GAMESTATE.ROLLING) {
            damageText = 'Roll the dice...';
        }

        return (
            <div className="damage-display-total__container">
                <h1 className="damage-display-total__damage-text">{damageText}</h1>
            </div>
        );
    }
}

export default DamageDisplayTotal;