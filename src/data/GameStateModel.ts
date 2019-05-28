import Die from "./DieModel";

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
    private static NUM_DICE: number = 4;
    // should handle the individual models and provide a
    // cohesive representation of the game at any given time
    private mPlayers: Player[] = [];
    private mTurn: number = 0;
    private mPoints: number = 0;

    public currentState: GAMESTATE = GAMESTATE.READY;
    public currentScore: number = 0;
    public rolledDice: Die[] = this.getNewDice();

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

    get points() {
        return this.mPoints;
    }

    public advance = () => {
        switch(this.currentState) {
            case GAMESTATE.READY:
                this.currentState = GAMESTATE.ROLLING;
                this.rolledDice = this.getNewDice();
                break;
            case GAMESTATE.ROLLING:
                if (this.mTurn++ <= GameStateModel.MAX_TURNS) {
                    this.mTurn++;
                } else {
                    this.currentState = GAMESTATE.FIGHTING;
                }
                break;
            case GAMESTATE.FIGHTING:
                this.currentState = GAMESTATE.END;
                break;
            default:
                this.currentState = GAMESTATE.READY;
                break;
        }
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

        this.advanceTurn();
    }

    private getNewDice(): Die[] {
        // Set all new dice to 1
        return Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
            return new Die(1, index);
        });
    }

    private advanceTurn() {
        this.mTurn++;
        if (this.mTurn === GameStateModel.MAX_TURNS) {
            // end turn, transition to FIGHTING
            this.currentState = GAMESTATE.FIGHTING;
        } else if (this.mTurn > 0) {
            this.currentState = GAMESTATE.ROLLING;
        }

        console.log(this.currentState);
    }

    private getRandomInt(min: number = 1, max: number = 6) {
        return Math.floor(Math.random() * Math.floor(max)) + min;
    }

    private initializePlayers = () => {
        // Players might need to be separate models
        return Array.from({length: 2}, (e, index: number) => {
            return {
                id: index,
                hp: 10,
                maxHp: 10,
            };
        });
    }
}