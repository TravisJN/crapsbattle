import Player from "./Player";
import Die from "./DieModel";

export enum GAMESTATE {
    READY,
    ROLLING,
    FIGHTING,
    ENDTURN,
    ENDGAME
}

export enum WINNER {
    NONE,
    PLAYER,
    ENEMY,
    TIE
}

export default class GameStateModel {
    public static NUM_DICE: number = 4;
    private static MAX_TURNS: number = 3;

    public currentState: GAMESTATE = GAMESTATE.READY;
    public winner: WINNER = WINNER.NONE;
    public lanes: number[] = [];

    private mPlayers: Player[] = [];
    private mPlayer: Player;
    private mEnemy: Player;
    private mTurn: number = 0;
    private mPlayerDamage: number = 0;
    private mEnemyDamage: number = 0;

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

    get human() {
        return this.mPlayer;
    }

    get enemy() {
        return this.mEnemy;
    }

    get playerDamage() {
        return this.mPlayerDamage;
    }

    get enemyDamage() {
        return this.mEnemyDamage;
    }

    public advance = () => {
        switch(this.currentState) {
            case GAMESTATE.READY:
                this.currentState = GAMESTATE.ROLLING;
                this.mPlayer.rollDice();
                this.mTurn++;
                break;
            case GAMESTATE.ROLLING:
                if (++this.mTurn < GameStateModel.MAX_TURNS) {
                    this.mPlayer.rollDice();  // roll the player dice
                } else {
                    this.mPlayer.rollDice();
                    this.mEnemy.rollDice();
                    this.currentState = GAMESTATE.FIGHTING;
                }
                break;
            case GAMESTATE.FIGHTING:
                // compare lanes
                this.compareLanes();
                this.applyDamage();
                this.checkWin();
                if (this.winner === WINNER.NONE) {
                    this.currentState = GAMESTATE.ENDTURN;
                } else {
                    this.currentState = GAMESTATE.ENDGAME;
                }
                break;
            case GAMESTATE.ENDTURN:
                this.resetTurn();
                this.currentState = GAMESTATE.READY;
                break;
            case GAMESTATE.ENDGAME:
                // ENDGAME state should not be advanced from
                // A new gamestatemodel should be created to start a new round
                console.error("Cannot advance from ENDGAME state!");
                break;
        }
    }

    public rollDice() {
        this.advance();
    }

    private compareLanes() {
        // compare dice at each index and build an array of psitive or negative dmg
        this.lanes = Array.from({length: GameStateModel.NUM_DICE}, (e, index: number) => {
            let player: Die = this.mPlayer.rolledDice[index];
            let enemy: Die = this.mEnemy.rolledDice[index];

            return player.number - enemy.number;
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
                this.mEnemy = player;
            }

            return player;
        });
    }

    private applyDamage = () => {
        this.lanes.forEach((aLane) => {
            if (aLane > 0) {
                this.mEnemyDamage += aLane;
            } else if (aLane < 0) {
                this.mPlayerDamage += Math.abs(aLane);
            }
        });

        this.mEnemy.hp -= this.mEnemyDamage;
        this.mPlayer.hp -= this.mPlayerDamage;
    }

    private checkWin = () => {
        if (this.mPlayer.hp <= 0) {
            if (this.mEnemy.hp <= 0) {
                // both players died on the same turn
                this.winner = WINNER.TIE;
            } else {
                this.winner = WINNER.ENEMY;
            }
        } else if (this.mEnemy.hp <= 0) {
            this.winner = WINNER.PLAYER;
        }
    }

    private resetTurn = () => {
        this.mPlayers.forEach((player: Player) => {
            player.rolledDice = player.setNewDice();
        });

        this.mPlayerDamage =
        this.mEnemyDamage = 0;

        this.mTurn = 0;

        this.lanes = [];
    }
}