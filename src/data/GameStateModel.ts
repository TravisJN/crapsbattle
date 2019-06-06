import Player from "./Player";

export enum GAMESTATE {
    READY,
    ROLLING,
    FIGHTING,
    END
}

export enum WINNER {
    NONE,
    PLAYER,
    ENEMY
}

export default class GameStateModel {
    public static NUM_DICE: number = 4;
    private static MAX_TURNS: number = 3;

    public currentState: GAMESTATE = GAMESTATE.READY;
    public winner: WINNER;

    private mPlayers: Player[] = [];
    private mPlayer: Player;
    private mEnemey: Player;
    private mTurn: number = 0;

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

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
                    this.determineWinner();
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

    private initializePlayers = () => {
        // Players might need to be separate models
        return Array.from({length: 2}, (e, index: number) => {
            const isHuman = index === 0;
            const player = new Player({
                isHuman,
                maxHp: 10,
            });

            if (isHuman) {
                this.mPlayer = player;
            } else {
                this.mEnemey = player;
            }

            return player;
        });
    }

    private determineWinner = () => {
        if (this.mPlayer.score > this.mEnemey.score) {
            this.winner = WINNER.PLAYER;
        } else if (this.mPlayer.score === this.mEnemey.score) {
            this.winner = WINNER.NONE;
        } else {
            this.winner = WINNER.ENEMY;
        }
    }
}