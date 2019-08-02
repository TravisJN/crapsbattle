import Die from "./DieModel";
import GameStateModel from './GameStateModel';

export interface PlayerParams {
    isHuman: boolean;
    maxHp: number;
}

export default class Player {
    public isHuman: boolean;
    public hp: number;
    public maxHp: number;
    public rolledDice: Die[] = this.setNewDice();

    constructor({ isHuman, maxHp }: PlayerParams) {
        this.isHuman = isHuman;
        this.maxHp = this.hp = maxHp;
    }

    public rollDice() {
        this.rolledDice = this.rolledDice.map((aDie: Die) => {
            if (!aDie.selected) {
                aDie.number = this.getRandomInt();
            }

            return aDie;
        });
    }

    public setNewDice(): Die[] {
        // Set all new dice to 1
        return Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
            return new Die(1, index);
        });
    }

    private getRandomInt(min: number = 1, max: number = 6) {
        return Math.floor(Math.random() * Math.floor(max)) + min;
    }
}