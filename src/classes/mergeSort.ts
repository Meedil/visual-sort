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
    sorted:boolean;
    stepStack:step[];

    constructor(){
        super();
        this.name = "Merge Sort";
        this.sorted = false;
        this.stepStack = [];
    }

    executeStep() {
        if(this.stepStack.length === 0){
            if(!this.isSorted())
                this.splitArray();
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

        const v1 = i1 < array1.length ? array1[i1] : undefined;
        const v2 = i2 < array2.length ? array2[i2] : undefined;
        let min:number;

        if(v1===undefined && v2===undefined){
            if(this.stepStack.length === 0) {this.sorted = true;}
            
            return {array: [...this.array]};
        }

        if(v1 === undefined){
            min = v2;
        }
        if(v2 === undefined){
            min = v1;
        }

        if(min === undefined){
            min = Math.min(v1, v2);
        }
        
        this.array[left + i1 + i2] = min;
        
        i1 += +(min === v1);
        i2 += +(min === v2);
        
        this.stepStack.push({left: left, right: right, array1: array1, array2: array2, i1: i1, i2: i2});
        
        return {array: [...this.array]};
    }

    getCurrentStep(){
        return this.stepStack.pop();
    }

    arrayExtract(left:number, right:number){
        if(left > right) return {array: []};
        return {array: [...this.array].splice(left, right - left + 1)};
    }

    isSorted(): boolean {
        return this.sorted;
    }

    reset(): void {
        this.stepStack = [];
        this.sorted = false;
    }
}