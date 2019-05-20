import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import GameStateModel from '../data/GameStateModel';
import DieModel from '../data/DieModel';

interface Props {
    gameModel: GameStateModel;
 }

interface State {
    currentPlayer: number;
    totalPoints: number;
    diceHeld: number[];
    rolledNums: DieModel[];
}

class GameBoard extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentPlayer: 0,
            totalPoints: 0,
            diceHeld: [],
            rolledNums: [],
        }
    }

    render() {
        return (
            <div className="game-board">
                <DiceRoller setRolledDice={this.setRolledDice} selectDie={this.selectDie} selectedDice={this.state.diceHeld} />
            </div>
        )
    }

    selectDie = (index: number) => {
        let diceHeld = this.state.diceHeld;
        console.log('number: ', this.state.rolledNums[index]);
        this.setState({ diceHeld });
    }

    setRolledDice = (rolledNums: DieModel[]) => {
        console.log(rolledNums);
        //this.setState({ rolledNums });
    }
}

export default GameBoard;
