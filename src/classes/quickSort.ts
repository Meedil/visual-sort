import { sorter } from "./sorter";

class quickSortStep{
    start:number;
    end:number;
    low:number;

    constructor(start:number, end:number){
        this.start = start;
        this.end = end;
        this.low = start-1;
    }
}

export class quickSort extends sorter{
    constructor(array?:number[]){
        super(array);

        this.name = "Quick Sort";
        this.stepDetailsQueue = [new quickSortStep(0, sorter.array.length-1)];
    }

    executeStep(): number[] {
        super.executeStep();
        let result = [...sorter.array];
        


        return result
    }
}

function quick_sort(array, start, end){
    let pivot = end;
    let low = start - 1;
    partition(start, end);

    quick_sort(array, start, )
}