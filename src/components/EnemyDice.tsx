import React, { Component } from 'react';

interface Props {}

interface State {}

class EnemyDice extends Component<Props, State> {
    render() {
        return (
            <div>
                {}
            </div>
        )
    }

    rollDice(max: number = 6) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

export default EnemyDice;
