import { sorter } from "./sorter";

export class selectionSort extends sorter{
    constructor(array?:number[]){
        super();
        this.name = "Selection Sort";
        this.stepStack = 0;
    }

    executeStep(): number[] {
        if(this.isSorted()) return this.array;
        
        let i = this.getCurrentStep();
        let indexOfMin = i;

        for(let j = i; j < this.array.length; j++){
            if(this.array[j] < this.array[indexOfMin]){
                indexOfMin = j;
            }
            this.comparisonCount++;
        }
        
        this.swap(i, indexOfMin);

        return [...this.array];
    }

    isSorted(): boolean {
        return this.stepStack >= this.array.length;
    }

    getCurrentStep() {
        return this.stepStack++;
    }

    reset(): void {
        super.reset();
        this.stepStack = 0;
    }
}