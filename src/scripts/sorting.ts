import { setTokenSourceMapRange } from 'typescript';
import { timePerStep, shuffle, isSorted } from '../preparation';

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
    console.log(`swapping i=${index1} and i=${index2}`);
    console.log('array: ', array)
    return[...array];
}

export interface sortStepResult{
    array: number[],
    step: number,
    countOffset: number,
}

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort,
}

export const sortStep:Function[] = [
    //bogosort = 0
    (array:number[], step):sortStepResult => {
        
        let result = [...shuffle(array)];
        return {array: result, step: ++step, countOffset: 1};
    },

    //insertionsort = 1
    (array:number[], setArray:Function, step, setStep:Function, count,setCount:Function):sortStepResult => {
        let result = [...array];
        let countOffset = 0;

        for(let i = 0; i < step+1; i++){
            const element = result[i];
            count++;
            if(result[step+1] < element){
                result = moveElementBack(result, step+1, i);
            }
        }
        
        return {array: result, step: ++step, countOffset: countOffset};
    },

    //selectionsort = 2
    (array:number[], setArray:Function, step, setStep:Function, count,setCount:Function):sortStepResult => {
        let result = [...array];
        let minIndex = step;
        let countOffset = 0;

        for(let i = step+1; i < array.length; i++){
            minIndex = array[i] < array[minIndex] ? i : minIndex;
            count++;
        }
        result = swapElements(result, step, minIndex);

        return {array: result, step: ++step, countOffset: countOffset};
    },

    //bubblesort = 3
    (array:number[], setArray:Function, step, setStep:Function, count,setCount:Function):sortStepResult => {
        let result = [...array];
        step = (step+1)%array.length;

        if(result[step] < result[step-1]){
            result = swapElements(result, step, step-1);
        }

        return {array: result, step: step, countOffset: 1};
    },
    
    //quicksort = 4
    (array:number[], left:number, right:number, step=0, lowEnd=-1)=>{
        let result = [...array];
        
    }
];
