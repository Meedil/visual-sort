import { color } from "../colors";
import { sorter } from "./sorter";

interface step{
    left:number;
    right:number;
    array1?:number[];
    array2?:number[];
    i1?:number;
    i2?:number;
} 

export class mergeSort extends sorter{
    isSplit:boolean;
    stepStack:step[];

    constructor(){
        super();
        this.name = "Merge Sort";
    }

    executeStep() {
        if(this.stepStack.length === 0){
            if(!this.isSorted()){
                this.splitArray();
                this.isSplit = true;
            }
            else
                return {array: this.array};
        }
        return this.mergeStep();
    }

    splitArray(left:number = 0, right:number = this.array.length - 1){
        this.stepStack.push({left: left, right: right});
        if(right - left <= 1) {
            return;
        }
        
        const mid = Math.floor((left + right)/2);
        this.splitArray(mid+1, right);
        this.splitArray(left, mid);
    }

    mergeStep(){
        const s = this.getCurrentStep();
        let {left, right, array1, array2, i1, i2} = s;
        if(array1 === undefined){
            const mid = Math.floor((left + right)/2);
            array1 = this.arrayExtract(left, mid).array;
            array2 = this.arrayExtract(mid+1, right).array;
            
            i1 = 0; i2 = 0;
        }

        const value1 = i1 < array1.length ? array1[i1] : undefined;
        const value2 = i2 < array2.length ? array2[i2] : undefined;
        let min:number;

        if(value1===undefined && value2===undefined){
            return {array: [...this.array]};
        }

        if(value1 === undefined){
            min = value2;
        }
        if(value2 === undefined){
            min = value1;
        }

        if(min === undefined){
            min = Math.min(value1, value2);
        }
        
        this.array[left + i1 + i2] = min;
        
        if(min === value1){
            i1++;
        } else if (min === value2){
            i2++;
        }
        
        this.stepStack.push({left: left, right: right, array1: array1, array2: array2, i1: i1, i2: i2});
        
        return {array: [...this.array], colors: [
            {index: left + i1 + i2, color: color.red},
        ]};
    }

    getCurrentStep(){
        return this.stepStack.pop();
    }

    arrayExtract(left:number, right:number){
        if(left > right) return {array: []};
        return {array: [...this.array].splice(left, right - left + 1)};
    }

    isSorted(): boolean {
        return this.isSplit && this.stepStack.length === 0;
    }

    reset(): void {
        super.reset();
        this.stepStack = [];
        this.isSplit = false;
    }
}