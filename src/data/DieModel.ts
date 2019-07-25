
export default class Die {
    public number: number;
    private mIndex: number;
    private mSelected: boolean = false;

    constructor(startingNum: number, index: number) {
        this.number = startingNum;
        this.mIndex = index;
    }

    get index(): number {
        return this.mIndex;
    }

    set index(newIndex: number) {
        this.mIndex = newIndex;
    }

    get selected() {
        return this.mSelected;
    }

    set selected(aIsSelected: boolean) {
        this.mSelected = aIsSelected;
    }
}
