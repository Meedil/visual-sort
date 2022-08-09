import {isSorted } from '../preparation';

export abstract class sorter{
    name: string;                   //TODO: Determine the necessity of this property
    static array?: number[];
    comparisonCount: number;
    arrayChanges: number;
    stepDetailsQueue?:any;

    constructor(array?:number[]){
        this.comparisonCount = 0;
        this.arrayChanges = 0;
        sorter.passArray(array)
    }

    executeStep(): number[]{
        if(this.isSorted()){return sorter.array}
    };
    isSorted(): boolean{
        return isSorted(sorter.array);
    };
    getNextStep?(): any;

    static passArray(array:number[]): void{
        sorter.array = array;
    }
    static _swap(index1:number, index2:number){
        const temp = sorter.array[index1];
        sorter.array[index1] = sorter.array[index2];
        sorter.array[index2] = temp;
    }
    swap(index1:number,index2:number){
        sorter._swap(index1, index2);
        this.arrayChanges += 2;
    }
}

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort,
}