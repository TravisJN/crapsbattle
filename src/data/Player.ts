import Die, { eDiceType } from "./DieModel";
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

    private mNumberCount;

    constructor({ isHuman, maxHp }: PlayerParams) {
        this.isHuman = isHuman;
        this.maxHp = this.hp = maxHp;
    }

    public rollDice() {
        this.mNumberCount = this.getNumberCount();
        // First
        this.rolledDice = this.rolledDice.map((aDie: Die) => {
            if (!aDie.selected) {
                aDie.number = this.getRandomInt();
                aDie.type = (Math.random() > .5) ? 1 : 0;
            }
            const dieType = this.mNumberCount[eDiceType[aDie.type]];

            if (dieType[aDie.number]) {
                dieType[aDie.number]++;
            } else {
                dieType[aDie.number] = 1;
            }

            return aDie;
        }).map((aDie: Die) => {
            const dieType = this.mNumberCount[eDiceType[aDie.type]];

            aDie.multiplier = dieType[aDie.number];
            return aDie;
        });
    }

    public setNewDice(): Die[] {
        // Set all new dice to 1
        return Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
            return new Die(1, index, eDiceType.NONE);
        });
    }

    private getRandomInt(min: number = 1, max: number = 6) {
        return Math.floor(Math.random() * Math.floor(max)) + min;
    }

    private getNumberCount() {
        return {
            ATTACK: {},
            DEFENSE: {},
        };
    }
}