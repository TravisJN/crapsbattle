import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import { GAMESTATE } from '../data/GameStateModel';
import Die from '../data/DieModel';
import './GameBoard.css';

interface Props {
    rollDice: () => void;
    rolledDice:  Die[];
    totalPoints: number;
    currentTurn: number;
    currentState: GAMESTATE;
    reset: () => void;
    advance: () => void;
    selectDie: (index: number) => void;
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
        return (
            <div className="game-board">
                <p>Turn: {this.props.currentTurn}</p>
                <p>Score: {this.props.totalPoints}</p>
                <DiceRoller
                    dice={this.props.rolledDice}
                    rollDice={this.props.rollDice}
                    currentState={this.props.currentState}
                    selectDie={this.props.selectDie}
                />
                { this.props.currentState === GAMESTATE.READY
                ? <button onClick={this.onStartClicked.bind(this)}>Start</button>
                : <button onClick={this.props.reset}>Reset</button>
            }
            </div>
        )
    }

    private onStartClicked = () => {
        this.props.advance();
    }
}

export default GameBoard;
