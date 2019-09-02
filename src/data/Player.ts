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

    private mNumberCount;  // keeps a count of each number rolled

    constructor({ isHuman, maxHp }: PlayerParams) {
        this.isHuman = isHuman;
        this.maxHp = this.hp = maxHp;
    }

    public rollDice() {
        this.mNumberCount = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };

        // First
        this.rolledDice = this.rolledDice.map((aDie: Die) => {
            if (!aDie.selected) {
                aDie.number = this.getRandomInt();
            }

            this.mNumberCount[aDie.number]++;

            return aDie;
        }).map((aDie: Die) => {
            aDie.multiplier = this.mNumberCount[aDie.number];
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