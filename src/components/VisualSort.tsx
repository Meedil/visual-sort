import { SetStateAction, useEffect, useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted, timePerStep, shuffle } from "../preparation";
import { swapElements, moveElementBack, SortAlgorithm} from "../scripts/sorting";

import styles from "./VisualSort.module.css";
interface visualSortState{
    array?: number[],
    step?: number,
    count?: number,
    isSorting?: boolean
}

export default function VisualSort(props){
    const [arraySize, setArraySize] = useState<number>(4);
    const [array, setArray] = useState(generateArray(arraySize));
    const [step, setStep] = useState<number>();
    const [count, setCount] = useState(0);
    const [isSorting, setSorting] = useState(false);

    // const [currentInterval, setCurrentInterval] = useState<any>();
    const [selectedSort, setSelectedSort] = useState(SortAlgorithm.bogoSort); 

    const setState = ({array, step, count, isSorting}:visualSortState) => {
        array && setArray(array);
        step && setStep(step);
        count && setCount(count);
        isSorting && setSorting(isSorting);
    }

    useEffect(() => {
        let timer = setTimeout(() => {if(isSorting){sortStep[selectedSort]();}}, timePerStep);
    }, [isSorting])

    const startSort = () => {
        setSorting(true);
    }

    const reset = () => {
        setArray(generateArray(arraySize));
        setStep(undefined);
        setCount(0);
        setSorting(false);
    }

    const sortStep:Function[] = [
        //bogosort = 0
        () => {            
            let result = [...shuffle(array)];
            setState({array: result, count: count + 1});
            if(isSorted(result)) {setSorting(false)};
        },
    
        //insertionsort = 1
        () => {
            let result = [...array];
            let countOffset = 0;
    
            for(let i = 0; i < step+1; i++){
                const element = result[i];
                countOffset++;
                if(result[step+1] < element){
                    result = moveElementBack(result, step+1, i);
                }
            }

            setState({array: result, step: step + 1, count: count + 1})
        },
    
        //selectionsort = 2
        () => {
            let result = [...array];
            let minIndex = step;
            let countOffset = 0;
    
            for(let i = step+1; i < array.length; i++){
                minIndex = array[i] < array[minIndex] ? i : minIndex;
                countOffset++;
            }
            result = swapElements(result, step, minIndex);

            setState({array: result, step: step+1, count: count + countOffset});
        },
    
        //bubblesort = 3
        () => {
            let result = [...array];
            let nextStep = (step+1)%array.length;
    
            if(result[nextStep] < result[nextStep-1]){
                result = swapElements(result, nextStep, nextStep-1);
            }
    
            setState({array: array, step: nextStep, count: count + 1})
        },
        
        //quicksort = 4
        (left:number, right:number, lowEnd=-1)=>{
            let result = [...array];
            
        }
    ];
    
    
    return(
        <>
            <OptionsBar />
            <ArrayVisualizer array={array}/>
            <div className={styles.buttonContainer}>
                <button className={`${styles.btn} ${styles.sortBtn} ${styles.primaryBtn}`} onClick={startSort} disabled={isSorting || isSorted(array)}>SORT</button>
                <div>Number of comparisons: {count}</div>
                {/* <div>Number of changes: {changeCount}</div>  */}
                <button className={`${styles.btn} ${styles.resetBtn} ${styles.primaryBtn}`} onClick={reset}>RESET</button>
            </div>
        </>
    )
}