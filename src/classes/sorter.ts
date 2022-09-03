import { colorTupple } from '../colors';
import {isSorted } from '../utilities';
interface sortResult{
    array:number[],
    colors?:colorTupple[],
}

export abstract class sorter{
    name: string;
    array?: number[];
    comparisonCount: number;
    stepCount: number;
    stepStack?:any;

    constructor(){
        this.reset();
    }

    reset():void{
        this.comparisonCount = 0;
        this.stepCount = 0;
    }

    abstract executeStep(): sortResult;
    isSorted(): boolean{
        return this.array !== undefined ? isSorted(this.array) : false;
    };
    getCurrentStep?(): any;

    passArray(array:number[]): void{
        this.reset();
        this.array = array;
    }
    _swap(index1:number, index2:number){
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }
    swap(index1:number,index2:number){
        this._swap(index1, index2);
        this.stepCount += 2;
    }
}

