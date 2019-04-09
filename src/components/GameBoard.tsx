import React, { Component } from 'react';
import DiceRoller from './DiceRoller';

interface Props { }

interface State {
    currentPlayer :string;
    diceHeld: number[];
    totalPoints: number;
    rolledNums: number [];
}

class GameBoard extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentPlayer: 'player',
            diceHeld: [],
            totalPoints: 0,
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

    setRolledDice = (rolledNums: number[]) => {
        this.setState({ rolledNums });
    }
}

export default GameBoard;