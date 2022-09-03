import { color } from "../colors";
import { sorter } from "./sorter";

export class selectionSort extends sorter{
    min:number;
    constructor(array?:number[]){
        super();
        this.name = "Selection Sort";
        this.min = 0;
    }

    executeStep() {
        if(this.isSorted()) return {array: this.array};
        
        let {i, j} = this.getCurrentStep();


        if(j === i+1){
            this.min = i;
        }

        if(this.array[j] < this.array[this.min]){
            this.min = j;
        }

        if(j === this.array.length - 1){
            this.swap(i, this.min);
        }

        // for(let j = i; j < this.array.length; j++){
        //     if(this.array[j] < this.array[indexOfMin]){
        //         indexOfMin = j;
        //     }
        //     this.comparisonCount++;
        // }

        return {array: [...this.array], colors: [
            {index: i, color: color.green},
            {index: j, color: color.red}
        ]};
    }

    isSorted(): boolean {
        return this.array !== undefined ? this.stepStack.i >= this.array.length-1 : false;
    }

    getCurrentStep() {
        let current = {...this.stepStack};
        this.stepStack.j = (this.stepStack.j + 1) % this.array.length;
        
        let nextI = +(this.stepStack.j === 0);
        this.stepStack.i += nextI;
        this.stepStack.j += nextI * (this.stepStack.i + 1);

        return current;
    }

    reset(): void {
        super.reset();
        this.stepStack = {i: 0, j: 1};
    }
}