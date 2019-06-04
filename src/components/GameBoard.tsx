import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import { GAMESTATE } from '../data/GameStateModel';
import Die from '../data/DieModel';
import './GameBoard.css';
import Player from '../data/Player';

interface Props {
    rollDice: () => void;
    playerDice:  Die[];
    playerScore: number;
    currentTurn: number;
    currentState: GAMESTATE;
    reset: () => void;
    advance: () => void;
    selectDie: (index: number) => void;
    players: Player[];
 }

interface State {
    currentPlayer: number;
}

class GameBoard extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentPlayer: 0,
        }
    }

    render() {
        const player: Player = this.props.players.find(player => player.isHuman);
        const enemy: Player = this.props.players.find(player => !player.isHuman)

        return (
            <div className="game-board">
                <DiceRoller
                    player={enemy}
                    dice={enemy.rolledDice}
                    rollDice={this.props.rollDice}
                    currentState={this.props.currentState}
                    selectDie={() => null}  // can't select enemy dice
                />
                <DiceRoller
                    player={player}
                    dice={player.rolledDice}
                    rollDice={this.props.rollDice}
                    currentState={this.props.currentState}
                    selectDie={this.props.selectDie}
                />
            </div>
        )
    }
}

export default GameBoard;
