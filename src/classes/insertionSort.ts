import { color, colorTupple } from "../colors";
import { sorter } from "./sorter";

//Insertion sort extra function
export function insertElement(array:any[], value:any, index:number){
    let arrayPart1 = array.splice(0, index);
    let arrayPart2 = array;

    return [...arrayPart1, value, ...arrayPart2];
}

export class insertionSort extends sorter{
    constructor(){
        super();
        this.name = "Insertion Sort";
    }

    isSorted(): boolean {
        return this.array !== undefined ? this.stepStack.i >= this.array.length : false;
    }
    
    jumpStep(){
        if(this.stepStack.j === 0) return;
        this.stepStack.i++;
        this.stepStack.j = 0;
    }

    getCurrentStep() {
        let current = {...this.stepStack}

        this.stepStack.j = (this.stepStack.j+1) % this.stepStack.i;
        this.stepStack.i += (+(this.stepStack.j===0));

        return current;
    }
    
    executeStep() {
        if(this.isSorted()) { return {array: this.array, colors: []}};

        let {i, j} = this.getCurrentStep();

        this.comparisonCount++;
        if(this.array[j] > this.array[i]){
            let temp = this.array.splice(i, 1);
            this.array = insertElement(this.array, temp[0], j);
            this.stepCount += 2;
            this.jumpStep();
        }

        let colors:colorTupple[] =[
            {index: j, color: color.red},
            {index: i, color: color.green}
        ]
        
        return {array: [...this.array], colors: colors};
    }
    
    reset(): void {
        super.reset();
        this.stepStack = {i: 1, j:0};
    }
}