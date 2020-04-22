import React, { Component } from 'react';
import './styles/DamageDisplayPerLane.css';
import GameStateModel from '../data/GameStateModel'; // This is the class, not an instance

interface Props {
    scores: number[];
}

class DamageDisplayPerLane extends Component<Props>{
    render() {
        return (
            <div className="damage-display-lane__container">
                { Array.from({length: GameStateModel.NUM_DICE}, (e, i) => {
                    return (
                        <div className="damage-display-lane__column" key={"dmg-col" + i}>
                            {this.props.scores[i]}
                        </div>
                    );
                }) }
            </div>
        )
    }
}

export default DamageDisplayPerLane;