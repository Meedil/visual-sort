import { color } from "../colors";
import { sorter } from "./sorter";

export class bubbleSort extends sorter{
    sorted:boolean;
    changed:boolean;

    constructor(){
        super();
        this.name = "Bubble Sort";
        this.stepStack = 0;
    }
    executeStep() {
        if(this.sorted) return {array: this.array};
        let step = this.getCurrentStep();
        if(this.array[step] > this.array[step+1]){
            this.swap(step, step+1);
            this.changed=true;
        }
        return {array: [...this.array], colors:[
            {index: step, color: color.red},
            {index: step+1, color: color.red}
        ]};
    }
    getCurrentStep() {
        let currentStep = this.stepStack;
        this.stepStack = (this.stepStack + 1) % (this.array.length - 1);
        if(this.stepStack === 0){
            if(!this.changed)this.sorted = true;
            else{this.changed = false;}
        }
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