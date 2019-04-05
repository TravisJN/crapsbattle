import React, { Component } from 'react';
import './diceRoller.css';
import dice1 from '../assets/dice-1.png';
import dice2 from '../assets/dice-2.png';
import dice3 from '../assets/dice-3.png';
import dice4 from '../assets/dice-4.png';
import dice5 from '../assets/dice-5.png';
import dice6 from '../assets/dice-6.png';

class DiceRoller extends Component {
    constructor(props) {
        super(props);

        this.imageMap = {
            1: dice1,
            2: dice2,
            3: dice3,
            4: dice4,
            5: dice5,
            6: dice6,
        }

        this.state = {
            numDice: 6,
            rolledNums: [1, 2, 3, 4, 5, 6]
        }
    }
    render() {
        const { rolledNums } = this.state;

        return (
            <div className="dice-roller-container">
                <div className="dice-roller__dice-row">
                    {rolledNums.map((num, idx) => {
                        // eslint-disable-next-line
                        return <img key={idx} src={this.imageMap[num]} width="60" height="60" />
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

    rollDice = () => {
        const rolledNums = Array.from({length: this.state.numDice}, () => this.getRandomInt(6) + 1);

        this.setState({ rolledNums });
    }

    updateNumDice = (event) => {
        this.setState({
            numDice: event.target.value
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
}

export default DiceRoller;