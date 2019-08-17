import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import { GAMESTATE } from '../data/GameStateModel';
import Die from '../data/DieModel';
import './GameBoard.css';
import Player from '../data/Player';
import DamageDisplayPerLane from './DamageDisplayPerLane';

interface Props {
    rollDice: () => void;
    playerDice:  Die[];
    currentTurn: number;
    currentState: GAMESTATE;
    advance: () => void;
    selectDie: (index: number) => void;
    players: Player[];
    lanes: number[];
 }

class GameBoard extends Component<Props> {
    render() {
        const { currentState, players, rollDice, selectDie, lanes } = this.props;
        const player: Player = players.find(player => player.isHuman);
        const enemy: Player = players.find(player => !player.isHuman);
        // const showEnemyDice = currentState === GAMESTATE.ENDTURN || currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ANIMATING;
        const showEnemyDice = true;
        const showPlayerDice = currentState !== GAMESTATE.READY && currentState !== GAMESTATE.STARTGAME && currentState !== GAMESTATE.CONNECTING;
        const playerDice =  showPlayerDice ? player.rolledDice : [];
        const enemyDice = showEnemyDice ? enemy.rolledDice : [];

        return (
            <div className="game-board">
                <DiceRoller
                    player={enemy}
                    dice={enemyDice}
                    rollDice={rollDice}
                    currentState={currentState}
                    selectDie={() => null}  // can't select enemy dice
                />
                <DamageDisplayPerLane scores={lanes} />
                <DiceRoller
                    player={player}
                    dice={playerDice}
                    rollDice={rollDice}
                    currentState={currentState}
                    selectDie={selectDie}
                />
            </div>
        )
    }
}

export default GameBoard;
