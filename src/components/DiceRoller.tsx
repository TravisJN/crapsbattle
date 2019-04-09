import React, { Component } from 'react';
import './diceRoller.css';
import Die from './Die';

interface Props {
    setRolledDice: (rolledNums:number[])=>void;
    selectDie: (index:number)=>void;
    selectedDice: number[];
}

interface State {
    numDice: number;
    rolledNums: number[];
}

class DiceRoller extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            numDice: 6,
            rolledNums: [1, 2, 3, 4, 5, 6],
        }

        this.props.setRolledDice(this.state.rolledNums);
    }

    public render() {
        const { rolledNums } = this.state;

        return (
            <div className="dice-roller-container">
                <div className="dice-roller__dice-row">
                    {rolledNums.map((num, idx) => {
                        return <Die num={num} idx={idx} key={"die"+idx} />
                    })}
                </div>
                <button onClick={this.rollDice}>Roll</button>
                <div className="dice-roller__num-dice-container">
                    <p className="dice-roller__num-dice-label">Number of dice: </p>
                    <input className="dice-roller__num-dice-input" type="text" value={this.state.numDice} onChange={this.updateNumDice} />
                </div>
            </div>
        )
    }

    private rollDice = () => {
        const rolledNums = Array.from({length: this.state.numDice}, () => this.getRandomInt(6) + 1);

        this.setState({ rolledNums });
        this.props.setRolledDice(rolledNums);
    }

    private updateNumDice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            numDice: parseInt(event.currentTarget.value)
        });
    }

    private getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * Math.floor(max));
      }

      private getDieContainerClass = (idx: number): string => {
        return "dice-roller_die-container";
      }

}

export default DiceRoller;