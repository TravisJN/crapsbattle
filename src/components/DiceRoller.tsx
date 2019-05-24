import React, { Component } from 'react';
import './diceRoller.css';
import Die from './Die';
import DieModel from '../data/DieModel';


interface Props {
    setRolledDice: (rolledNums:DieModel[])=>void;
    canRollDice: boolean;
}

interface State {
    numDice: number;
    rolledNums: DieModel[];
}

class DiceRoller extends Component<Props, State> {
    readonly state: State = {
        numDice: 6,
        rolledNums: [],
    };

    constructor(props: Props) {
        super(props);

        this.state.rolledNums = this.getNewDice(this.state.numDice);
        this.props.setRolledDice(this.state.rolledNums);
    }

    public render() {
        const { rolledNums } = this.state;


        return (
            <div className="dice-roller-container">
                <div className="dice-roller__dice-row">
                    {rolledNums.map((die: DieModel, idx: number) => {
                        return <Die num={die.number} idx={idx} selected={die.selected} onClick={this.onDieClicked} key={"die"+idx} />
                    })}
                </div>
                <button onClick={this.rollDice} disabled={!this.props.canRollDice}>Roll</button>
                <div className="dice-roller__num-dice-container">
                    <p className="dice-roller__num-dice-label">Number of dice: </p>
                    <input className="dice-roller__num-dice-input" type="text" value={this.state.numDice} onChange={this.updateNumDice} />
                </div>
            </div>
        )
    }

    private rollDice = () => {
        this.setState((prevState: State) => {
            const rolledNums = prevState.rolledNums.map((aDie: DieModel) => {
                if (!aDie.selected) {
                    aDie.number = this.getRandomInt(6) + 1;
                }

                return aDie;
            });

            this.props.setRolledDice(rolledNums);

            return { rolledNums };
        });
    }

    private updateNumDice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            numDice: parseInt(event.currentTarget.value)
        });
    }

    private getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * Math.floor(max));
      }

    private getNewDice(numDice): DieModel[] {
        return Array.from({length: numDice}, (e, i) => {
            return new DieModel(this.getRandomInt(6) + 1, i);
        });
    }

    private onDieClicked = (index: number) => {
        this.setState((prevState: State) => {
            prevState.rolledNums[index].selected = !prevState.rolledNums[index].selected
            return {
                rolledNums: prevState.rolledNums,
            };
        });
    }

}

export default DiceRoller;
