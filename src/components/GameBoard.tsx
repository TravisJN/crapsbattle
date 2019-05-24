import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import GameStateModel, { GAMESTATE } from '../data/GameStateModel';
import DieModel from '../data/DieModel';

interface Props {
    setRolledDice: (rolledDice: DieModel[])=>void;
    totalPoints: number;
    currentTurn: number;
    currentState: GAMESTATE;
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
                <DiceRoller setRolledDice={this.props.setRolledDice} canRollDice={this.props.currentState === GAMESTATE.ROLLING} />
            </div>
        )
    }
}

export default GameBoard;
