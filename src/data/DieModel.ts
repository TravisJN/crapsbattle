
export default class DieModel {
    private mNum: number;
    private mIndex: number;
    private mSelected: boolean = false;

    constructor(startingNum: number, index: number) {
        this.mNum = startingNum;
        this.mIndex = index;
    }

    get number(): number {
        return this.mNum;
    }

    set number(newNum: number) {
        this.mNum = newNum;
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
