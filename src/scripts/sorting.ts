import { setTokenSourceMapRange } from 'typescript';
import { shuffle, isSorted } from '../preparation';

//Insert Sort extras
export function moveElementBack(array:any[], fromIndex:number, toIndex:number){
    let arr1 = array.splice(0, toIndex);
    let arr2 = array.splice(0, fromIndex - toIndex);
    
    let value = array.splice(0, 1);

    return [...arr1, ...value, ...arr2, ...array];
}

//Select sort and Bubble Sort extras
export function swapElements(array:any[], index1:number, index2:number){
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return[...array];
}

export interface sortStepResult{
    array: number[],
    step: number,
    countOffset: number,
}


export interface sorter{
    name: string,
    step: Function,
    // data?: any;
}

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort,
}