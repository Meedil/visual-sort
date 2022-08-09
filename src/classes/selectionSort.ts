import { sorter } from "./sorter";

export class selectionSort extends sorter{
    constructor(array:number[]){
        super(array);
        this.name = "selectionSort";
        this.stepDetailsQueue = 0;
    }

    executeStep(): number[] {
        super.executeStep();
        let result = [...sorter.array];
        let i = this.getNextStep();
        let indexOfMin = 0;

        for(let j = i; j < sorter.array.length; j++){
            if(sorter.array[j] < sorter.array[indexOfMin]){
                indexOfMin = j;
            }
            this.comparisonCount++;
        }
        this.swap(i, indexOfMin);

        return result;
    }

    isSorted(): boolean {
        return this.stepDetailsQueue >= sorter.array.length
    }

    getNextStep() {
        return this.stepDetailsQueue++;
    }
}