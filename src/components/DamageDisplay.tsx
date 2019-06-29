import React, { Component } from 'react';
import './DamageDisplay.css';
import GameStateModel from '../data/GameStateModel'; // This is the class, not an instance

interface Props {
    scores: number[];
}

class DamageDisplay extends Component<Props>{
    render() {
        return (
            <div className="damage-display__container">
                { Array.from({length: GameStateModel.NUM_DICE}, (e, i) => {
                    return (
                        <div className="damage-display__column" key={"dmg-col" + i}>
                            {this.props.scores[i]}
                        </div>
                    );
                }) }
            </div>
        )
    }
}

export default DamageDisplay;