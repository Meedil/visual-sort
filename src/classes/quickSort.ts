import { color, colorTupple } from "../colors";
import { sorter } from "./sorter";

class step{
    start:number;
    end:number;
    pivot:number;
    low:number;
    i:number;

    constructor(start:number, end:number, low?:number, pivot?:number, i?:number){
        this.start = start;
        this.i = i === undefined ? start : i;
        this.end = end;
        this.pivot = pivot === undefined ? end : pivot;
        this.low = low === undefined ? start-1 : low;
    }
}

export class quickSort extends sorter{
    stepStack: step[];

    constructor(){
        super();

        this.name = "Quick Sort";
    }

    executeStep() {
        if(this.isSorted()) return {array: this.array}

        let s = this.getCurrentStep();
        let {start, end, low, pivot, i} = s;
        
        if(start >= end){
            return {array: [...this.array]};
        }

        if(i<pivot){    //Partition-step if i < pivot
            this.comparisonCount++;
            
            if(this.array[i] < this.array[pivot]){
                low++;
                this.swap(i, low);
            }
            
            this.pushStep(new step(start, end, low, pivot, ++i));
        } 
        else if(i===pivot){   //When partition ends
            this.swap(low+1, pivot);
            pivot = low+1;
            
            this.pushStep(new step(pivot+1, end));
            this.pushStep(new step(start, low));
        }
        
        return {array: [...this.array], colors:[
            {index: i, color: color.red},
            {index: pivot, color: color.green},
            {index: low+1, color: color.red}
        ]};
    }

    isSorted(): boolean {
        return this.stepStack.length === 0;
    }

    passArray(array: number[]): void {
        super.passArray(array);
        this.pushStep(new step(0, array.length-1));
    }

    getCurrentStep():step{
        let s:step = this.stepStack.pop();
        return s;
    }

    pushStep(s:step){
        this.stepStack.push(s);
    }
    reset(): void {
        super.reset();
        this.stepStack = [];
    }
}
