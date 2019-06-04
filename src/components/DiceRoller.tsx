import React, { Component } from 'react';
import './diceRoller.css';
import DieComponent from './DieComponent';
import Die from '../data/DieModel';
import { GAMESTATE } from '../data/GameStateModel';
import Player from '../data/Player';


interface Props {
    rollDice: () => void;
    currentState: GAMESTATE;
    dice: Die[];
    selectDie: (index: number) => void;
    player: Player;
}

interface State {
    numDice: number;
    rolledNums: Die[];
}

class DiceRoller extends Component<Props, State> {
    readonly state: State = {
        numDice: 4,
        rolledNums: [],
    };

    public render() {
        const canRollDice: boolean = this.props.currentState === GAMESTATE.ROLLING;

        return (
            <div className="dice-roller-container">
                <div className="dice-roller__dice-row">
                    {this.props.dice.map((die: Die, idx: number) => {
                        return <DieComponent num={die.number} idx={idx} selected={die.selected} onClick={this.onDieClicked} key={"die"+idx} />
                    })}
                </div>
                {   this.props.player.isHuman
                    ? <button className="dice-roller__roll-button" onClick={this.props.rollDice} disabled={!canRollDice}>Roll</button>
                    : null
                }
            </div>
        )
    }

    private onDieClicked = (index: number) => {
        this.props.selectDie(index);
    }
}

export default DiceRoller;
