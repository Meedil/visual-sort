import { sorter } from "./sorter";

class step{
    start:number;
    end:number;
    pivot:number;
    left:number;
    right:number;

    constructor(start:number, end:number, pivot?:number, left?:number, right?:number){
        this.start = start; this.left = left === undefined ? start : left;
        this.end = end; this.right = right === undefined ? end : right;
        this.pivot = pivot === undefined ? Math.floor((start+end)/2) : pivot;
    }
}

export class quickSort extends sorter{
    stepStack: step[];

    constructor(){
        super();

        this.name = "Quick Sort";
        this.stepStack = [];
    }

    executeStep(): number[] {
        let changed = false;

        let s = this.getCurrentStep();
        let {start, end, pivot: mid, left, right} = s;
        let pivot = this.array[mid];
        
        if(start >= end)
            return [...this.array];
        

        if(left < mid || right > mid){
            let moveLeft = () => this.array[left] < pivot;
            let moveRight = () => this.array[right] > pivot;

            if(!(moveRight() || moveLeft())){
                if(left === mid) mid = right;
                else if(right === mid) mid = left;

                this.swap(left, right);
                changed = true;
            }

            if(moveLeft())
                left++;
            
            if(moveRight())
                right--;

            this.stepStack.push(new step(start, end, mid, left, right))
        }else if(left === mid && right === mid){
            this.stepStack.push(new step(mid+1, end))
            this.stepStack.push(new step(start, mid-1))
        }

        if(changed)
            return [...this.array];
        else
            return this.executeStep();
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