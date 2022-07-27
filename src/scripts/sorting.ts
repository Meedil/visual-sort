import { timePerStep, shuffle, isSorted } from '../preparation';

//Insert Sort extras
function moveElementBack(array:any[], fromIndex:number, toIndex:number){
    let arr1 = array.splice(0, toIndex);
    let arr2 = array.splice(0, fromIndex - toIndex);
    
    let value = array.splice(0, 1);

    return [...arr1, ...value, ...arr2, ...array];
}

//Select sort and Bubble Sort extras
function swapElements(array:any[], index1:number, index2:number){
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    console.log(`swapping i=${index1} and i=${index2}`);
    console.log('array: ', array)
    return[...array];
}

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort
}

export const sortStep:Function[] = [
    //bogosort = 0
    (array:number[], step = 0) => {
        let result = [...shuffle(array)];
        console.log(array);
        
        return {array: result, step: ++step};
    },

    //insertionsort = 1
    (array:number[], step = 0) => {
        let result = [...array];
        let count = 0;

        for(let i = 0; i < step+1; i++){
            const element = result[i];
            count++;
            if(result[step+1] < element){
                result = moveElementBack(result, step+1, i);
            }
        }
        
        return {array: result, step: ++step, countOffset: count};
    },

    //selectionsort = 4
    (array:number[], step = 0) => {
        let result = [...array];
        let minIndex = step;
        let count = 0;

        for(let i = step+1; i < array.length; i++){
            minIndex = array[i] < array[minIndex] ? i : minIndex;
            count++;
        }
        result = swapElements(result, step, minIndex);

        return {array: result, step: ++step, countOffset: count};
    },

    //bubblesort = 3
    (array:number[], step=0) => {
        let result = [...array];
        step = (step+1)%array.length;

        if(result[step] < result[step-1]){
            result = swapElements(result, step, step-1);
        }

        return {array: result, step: step, countOffset: 1};
    }
];

