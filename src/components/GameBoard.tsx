import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import { GAMESTATE } from '../data/GameStateModel';
import DieModel from '../data/DieModel';
import './GameBoard.css';

interface Props {
    setRolledDice: (rolledDice: DieModel[])=>void;
    totalPoints: number;
    currentTurn: number;
    currentState: GAMESTATE;
    reset: () => void;
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
        console.log(this.props.totalPoints);
        return (
            <div className="game-board">
                <p>Turn: {this.props.currentTurn}</p>
                <p>Score: {this.props.totalPoints}</p>
                <DiceRoller
                    setRolledDice={this.props.setRolledDice}
                    canRollDice={this.props.currentState !== GAMESTATE.FIGHTING}
                />
                <button onClick={this.props.reset}>Reset</button>
            </div>
        )
    }
}

export default GameBoard;
