import DieModel from "./DieModel";

export interface Player {
    hp: number;
    maxHp: number;
}

export enum GAMESTATE {
    READY,
    ROLLING,
    FIGHTING,
    END
}

export default class GameStateModel {
    private static MAX_TURNS: number = 3;
    // should handle the individual models and provide a
    // cohesive representation of the game at any given time
    public currentState: GAMESTATE = GAMESTATE.READY;
    private mPlayers: Player[] = [];
    private mTurn: number = 0;
    private mRolledDice: DieModel[] = [];

    public currentScore: number = 0;

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    set rolledDice(dice: DieModel[]) {
        this.mRolledDice = dice;

        this.currentScore = dice.reduce((total: number, die: DieModel) => {
                                return total + die.number;
                            }, 0);

        this.advanceTurn();
    }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

    public advanceTurn() {
        this.mTurn++;
        if (this.mTurn === GameStateModel.MAX_TURNS) {
            // end turn, transition to FIGHTING
            this.currentState = GAMESTATE.FIGHTING;
        } else if (this.mTurn > 0) {
            this.currentState = GAMESTATE.ROLLING;
        }

        console.log(this.currentState);
    }

    private initializePlayers = () => {
        return Array.from({length: 2}, (e, index: number) => {
            return {
                id: index,
                hp: 10,
                maxHp: 10,
            };
        });
    }
}