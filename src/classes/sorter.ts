import { colorTupple } from '../colors';
import {isSorted } from '../preparation';
interface sortResult{
    array:number[],
    colors?:colorTupple[],
}

export abstract class sorter{
    name: string;
    array?: number[];
    comparisonCount: number;
    arrayEditsCount: number;
    stepStack?:any;

    constructor(){
        this.comparisonCount = 0;
        this.arrayEditsCount = 0;
        this.reset();
    }

    reset():void{
        this.comparisonCount = 0;
        this.arrayEditsCount = 0;
    }

    abstract executeStep(): sortResult;
    isSorted(): boolean{
        return this.array !== undefined ? isSorted(this.array) : false;
    };
    getCurrentStep?(): any;

    passArray(array:number[]): void{
        this.reset();
        this.array = array;
        console.log('array passed to ' + this.name, this.array);
        
    }
    _swap(index1:number, index2:number){
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }
    swap(index1:number,index2:number){
        this._swap(index1, index2);
        this.arrayEditsCount += 2;
    }
}

