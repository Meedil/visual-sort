import { sorter } from "./sorter";

//Insertion sort extra function
export function insertElement(array:any[], value:any, index:number){
    let arrayPart1 = array.splice(0, index);
    let arrayPart2 = array;

    return [...arrayPart1, value, ...arrayPart2];
}

export class insertionSort extends sorter{
    constructor(array?:number[]){
        super(array);
        this.stepDetailsQueue = 1;
        this.name = "Insertion Sort"
    }

    isSorted(): boolean {
        return this.stepDetailsQueue >= sorter.array.length;
    }
    
    getNextStep() {
        return this.stepDetailsQueue++;
    }
    
    executeStep(): number[] {
        super.executeStep();    //cancels if sorted

        let result = [...sorter.array];
        let i = this.getNextStep();

        for(let j = 0; j < i; j++){
            this.comparisonCount++;
            if(sorter.array[j] > sorter.array[i]){
                let temp = sorter.array.splice(i, 1);
                sorter.array = insertElement(sorter.array, temp[0], j);
                this.arrayChanges += 2;
            }
        }

        return result;
    }
}