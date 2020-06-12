import React, { Component } from 'react';
import { eDiceType } from '../data/DieModel';
import dice1 from '../assets/dice-1.png';
import dice2 from '../assets/dice-2.png';
import dice3 from '../assets/dice-3.png';
import dice4 from '../assets/dice-4.png';
import dice5 from '../assets/dice-5.png';
import dice6 from '../assets/dice-6.png';
import './styles/DieComponent.css';

interface Props {
    num: number;
    idx: number;
    selected: boolean;
    onClick: any;
    type: eDiceType;
 }

interface State { }

class DieComponent extends Component<Props, State> {
    private imageMap: { [n:number]: string } = {
        1: dice1,
        2: dice2,
        3: dice3,
        4: dice4,
        5: dice5,
        6: dice6,
    };

    public render = () => {
        const { idx, num } = this.props;
        return (
            <div className={this.getContainerClassName()} key={idx} onClick={this.select}>
                <img src={this.imageMap[num]} width="100%" height="100%" />
            </div>
        )
    }

    private getContainerClassName = () => {
        const { selected, type } = this.props;
        let className: string = "die-component__die-container";

        if (selected) {
            className += " selected";
        }

        if (type === eDiceType.ATTACK) {
            className += " attack";
        } else {
            className += " defend";
        }

        return className;
    }

    private select = () => {
        this.props.onClick(this.props.idx);
    }
}

export default DieComponent;
