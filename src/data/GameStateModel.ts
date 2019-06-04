import Die from "./DieModel";
import Player from "./Player";

export enum GAMESTATE {
    READY,
    ROLLING,
    FIGHTING,
    END
}

export default class GameStateModel {
    private static MAX_TURNS: number = 3;
    public static NUM_DICE: number = 4;
    // should handle the individual models and provide a
    // cohesive representation of the game at any given time
    private mPlayers: Player[] = [];
    private mTurn: number = 0;
    //private mPoints: number = 0;

    public currentState: GAMESTATE = GAMESTATE.READY;
    //public currentScore: number = 0;
    //public rolledDice: Die[] = this.getNewDice();

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

    // get points() {
    //     return this.mPoints;
    // }

    public advance = () => {
        switch(this.currentState) {
            case GAMESTATE.READY:
                this.currentState = GAMESTATE.ROLLING;
                this.resetTurn();
                break;
            case GAMESTATE.ROLLING:
                if (this.mTurn++ <= GameStateModel.MAX_TURNS) {
                    this.mTurn++;
                    this.mPlayers[0].rollDice();  // roll the player dice
                } else {
                    this.mPlayers[0].rollDice();
                    this.mPlayers[1].rollDice();
                    this.currentState = GAMESTATE.FIGHTING;
                }
                break;
            case GAMESTATE.FIGHTING:
                this.currentState = GAMESTATE.END;
                break;
        }
    }

    public rollDice() {
        this.advance();
    }

    private resetTurn = () => {
        this.mPlayers.forEach((player: Player) => {
            player.setNewDice();
        });
    }

    // private getNewDice(): Die[] {
    //     // Set all new dice to 1
    //     return Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
    //         return new Die(1, index);
    //     });
    // }

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

    // private getRandomInt(min: number = 1, max: number = 6) {
    //     return Math.floor(Math.random() * Math.floor(max)) + min;
    // }

    private initializePlayers = () => {
        // Players might need to be separate models
        return Array.from({length: 2}, (e, index: number) => {
            return new Player({
                isHuman: index === 0,
                maxHp: 10,
            });
        });
    }
}