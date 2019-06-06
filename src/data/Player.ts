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

    private mPoints: number = 0;

    constructor({ isHuman, maxHp }: PlayerParams) {
        this.isHuman = isHuman;
        this.maxHp = this.hp = maxHp;
    }

    public rollDice() {
        this.mPoints = 0;
        this.rolledDice = this.rolledDice.map((aDie: Die) => {
            if (!aDie.selected) {
                aDie.number = this.getRandomInt();
            }

            // todo: probably won't have a notion of "points" but let's just calculate this here so we can do a simple game flow set up
            this.mPoints += aDie.number;

            return aDie;
        });
    }

    public setNewDice(): Die[] {
        // Set all new dice to 1
        return Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
            return new Die(1, index);
        });
    }

    public get score(): number {
        return this.rolledDice.reduce((sum: number, die: Die) => {
            return sum + die.number;
        }, 0);
    }

    private getRandomInt(min: number = 1, max: number = 6) {
        return Math.floor(Math.random() * Math.floor(max)) + min;
    }
}