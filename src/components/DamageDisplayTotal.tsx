import React, { Component } from 'react';
import './DamageDisplayTotal.css';
import GameStateModel from '../data/GameStateModel'; // This is the class, not an instance

interface Props {
    damage: number;
}

class DamageDisplayTotal extends Component<Props>{
    render() {
        return (
            <div className="damage-display-total__container">
                <h1 className="damage-display-total__damage-text">{this.props.damage}</h1>
            </div>
        )
    }
}

export default DamageDisplayTotal;