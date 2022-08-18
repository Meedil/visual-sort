import { sorter } from "./sorter";

export class bubbleSort extends sorter{
    sorted:boolean;
    changed:boolean;

    constructor(){
        super();
        this.name = "Bubble Sort";
        this.stepStack = 0;
    }
    executeStep(): number[] {
        let step = this.getCurrentStep();
        if(this.array[step] > this.array[step+1]){
            this.swap(step, step+1);
        }
        return [...this.array];
    }
    getCurrentStep() {
        let currentStep = this.stepStack;
        this.stepStack = (this.stepStack + 1) % (this.array.length - 1);
        return currentStep;
    }
    reset(): void {
        this.stepStack=0;
        this.sorted = false;
        this.changed = false;
    }
    isSorted(): boolean {
        return this.sorted;
    }
}