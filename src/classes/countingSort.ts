import { sorter } from "./sorter";

export class countingSort extends sorter{
    valueCount = []
    puttingTogether = false;

    constructor(){
        super();
        this.name = "Counting Sort";
        this.valueCount = [];
        this.stepStack = 0;
    }

    executeStep(): number[] {
        throw new Error("Method not implemented.");
    }

    hashStep(){
        let step = this.getCurrentStep();
        if(this.valueCount[this.array[step]] === undefined) this.valueCount[this.array[step]] = 0;
        this.valueCount[this.array[step]]++;
    }
    
    getCurrentStep() {
        return this.stepStack++;
    }
}