import React, { Component } from 'react';
import './styles/DamageDisplayPerLane.css';
import GameStateModel from '../data/GameStateModel'; // This is the class, not an instance
import sword from '../assets/sword.png';
import shield from '../assets/shield.png';
import Player from '../data/Player';

interface Props {
    player: Player;
    enemy: Player;
    showDamage: boolean;
}

class DamageDisplayPerLane extends Component<Props>{
    render() {
        const { player, enemy, showDamage } = this.props;
        return (
            <div className="damage-display-lane__container">
                <div className="damage-display-lane__score-container">
                    <div className="damage-display-lane__attack-container">
                        <img src={sword} className="damage-display__icon" />
                        {showDamage && enemy.attackTotal}
                    </div>
                    <div className="damage-display-lane__defense-container">
                        <img src={shield} className="damage-display__icon" />
                        {showDamage && enemy.defenseTotal}
                    </div>
                </div>
                <div className="damage-display-lane__score-container">
                    <div className="damage-display-lane__attack-container">
                        <img src={sword} className="damage-display__icon" />
                        {player.attackTotal}
                    </div>
                    <div className="damage-display-lane__defense-container">
                        <img src={shield} className="damage-display__icon" />
                        {player.defenseTotal}
                    </div>
                </div>
            </div>
        )
    }
}

export default DamageDisplayPerLane;

// class DamageDisplayPerLane extends Component<Props>{
//     render() {
//         return (
//             <div className="damage-display-lane__container">
//                 { Array.from({length: GameStateModel.NUM_DICE}, (e, i) => {
//                     return (
//                         <div className="damage-display-lane__column" key={"dmg-col" + i}>
//                             {this.props.scores[i]}
//                         </div>
//                     );
//                 }) }
//             </div>
//         )
//     }
// }