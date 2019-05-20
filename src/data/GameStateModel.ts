
export interface Player {
    hp: number;
    maxHp: number;
}

export default class GameStateModel {
    // should handle the individual models and provide a
    // cohesive representation of the game at any given time
    private mPlayers: Player[] = [];

    constructor() {
        this.mPlayers = this.initializePlayers();
    }

    get players() {
        return this.mPlayers;
    }

    private initializePlayers = () => {
        return Array.from({length: 2}, () => {
            return {
                hp: 10,
                maxHp: 10,
            };
        });
    }
}