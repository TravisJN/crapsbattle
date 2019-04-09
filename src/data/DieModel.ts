class Die {
    private currentNumber: number;

    constructor(startingNum: number) {
        this.currentNumber = startingNum;
    }

    get number(): number {
        return this.currentNumber;
    }

    set number(newNum: number) {
        this.currentNumber = newNum;
    }
}

export default Die;