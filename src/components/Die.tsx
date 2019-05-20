import React, { Component } from 'react';
import dice1 from '../assets/dice-1.png';
import dice2 from '../assets/dice-2.png';
import dice3 from '../assets/dice-3.png';
import dice4 from '../assets/dice-4.png';
import dice5 from '../assets/dice-5.png';
import dice6 from '../assets/dice-6.png';
import './diceRoller.css';

interface Props {
    num: number;
    idx: number;
    selected: boolean;
    onClick: any;
 }

interface State { }

class Die extends Component<Props, State> {
    private imageMap: { [n:number]: string } = {
        1: dice1,
        2: dice2,
        3: dice3,
        4: dice4,
        5: dice5,
        6: dice6,
    };

    public render = () => {
        return (
            <div className={this.getContainerClassName()} key={this.props.idx} onClick={this.select}>
                <img src={this.imageMap[this.props.num]} width="60" height="60" />
            </div>
        )
    }

    private getContainerClassName = () => {
        return this.props.selected ? "dice-roller_die-container selected" : "dice-roller_die-container";
    }

    private select = () => {
        this.props.onClick(this.props.idx);
    }
}

export default Die;