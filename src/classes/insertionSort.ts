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
        this.stepStack = 1;
        this.name = "Insertion Sort";
    }

    isSorted(): boolean {
        return this.stepStack > this.array.length;
    }
    
    getCurrentStep() {
        return this.stepStack++;
    }
    
    executeStep(): number[] {
        if(this.isSorted()) return this.array;

        let i = this.getCurrentStep();

        for(let j = 0; j < i; j++){
            this.comparisonCount++;
            if(this.array[j] > this.array[i]){
                let temp = this.array.splice(i, 1);
                this.array = insertElement(this.array, temp[0], j);
                this.arrayEditsCount += 2;
            }
        }

        return [...this.array];
    }
    
    reset(): void {
        super.reset();
        this.stepStack = 1;
    }
}