import { SetStateAction, useEffect, useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted, shuffle } from "../preparation";
import { swapElements, moveElementBack, SortAlgorithm, sorter} from "../scripts/sorting";

import styles from "./VisualSort.module.css";
interface visualSortState{
    array?: number[],
    step?: number,
    count?: number,
    changeCount?:number,
    isSorting?: boolean,
    extraData?: any
    selectedSort?:SortAlgorithm,
}

const loadedSort:SortAlgorithm = localStorage.getItem("selectedSort") == null ? 0 : parseInt(localStorage.getItem("selectedSort"));

export default function VisualSort(props){
    const [arraySize, setArraySize] = useState<number>(4);
    const [selectedSort, setSelectedSort] = useState(loadedSort); 
    const [timePerStep, setTimePerStep] = useState(500);

    const [array, setArray] = useState(generateArray(arraySize));
    const [step, setStep] = useState(0);
    const [count, setCount] = useState(0);
    const [changeCount, setChangeCount] = useState(0);
    const [isSorting, setSorting] = useState(false);
    const [extraData, setExtraData] = useState<any>();

    const setState = ({array, step, count, changeCount, isSorting, selectedSort, extraData: extraData}:visualSortState) => {
        //Sorting state-vars
        (array != undefined) && setArray(array);
        (step != undefined) && setStep(step);
        (count != undefined) && setCount(count);
        (changeCount != undefined) && setChangeCount(changeCount);
        (isSorting != undefined) && setSorting(isSorting);
        (extraData != undefined) && setExtraData(extraData);
        //Options state-vars
        (selectedSort != undefined) && setSelectedSort(selectedSort);
    }


    //Calles setTime out to carry out sorting steps
    useEffect(() => {
        let timer = setTimeout(() => {if(isSorting){sorters[selectedSort].step();}}, timePerStep);
    }, [isSorting, array])

    //on load get from local storage
    useEffect(() => {
        
        setState({
            selectedSort: loadedSort,
        })        
    }, [])
    //on option state-var updates update, set local storage
    useEffect(() => {
        localStorage.setItem("selectedSort", selectedSort.toString());
    }, [selectedSort])

    useEffect(() => {
    }, [step])
    useEffect(() => {
    }, [arraySize])


    const startSort = () => {
        setSorting(true);
    }

    const reset = () => {
        setState({
            array: generateArray(arraySize), 
            step: 0, 
            count: 0, 
            changeCount: 0, 
            isSorting: false,
            extraData: {}
        });
    }

    const sorters:sorter[] = [
        //bogosort = 0
        {name:"Bogosort", 
        step: () => {
            let result = [...shuffle(array)];
            
            setState({array: result, count: count + 1});
            if(isSorted(result)) {setSorting(false);}
        }},
    
        //insertionsort = 1
        {name: "Insertion Sort",
        step: () => {
            if(!isSorting)return;
            let result = [...array];
            let countOffset = 0;
            let changed = false;

            for(let i = 0; i < step+1; i++){
                const element = result[i];
                countOffset++;

                if(result[step+1] < element){
                    result = moveElementBack(result, step+1, i);
                    changed = true;
                }
            }
            
            setState({array: result, step: step + 1, count: count + countOffset, changeCount: changeCount + (+changed)})
            if (step+1 >= array.length - 1){
                setSorting(false);
            } 
        }},
    
        //selectionsort = 2
        {name: "Selection Sort", 
        step: () => {
            let result = [...array];
            let minIndex = step;
            let countOffset = 0;
            let changed = false;
    
            for(let i = step+1; i < array.length; i++){
                minIndex = array[i] < array[minIndex] ? i : minIndex;
                countOffset++;
            }
            result = swapElements(result, step, minIndex);
            changed = step != minIndex; 

            setState({array: result, step: step+1, count: count + countOffset, changeCount: changeCount + (+changed)});
            if (step+1 >= array.length - 1){
                setSorting(false);
            } 
        }},
    
        //bubblesort = 3
        {name: "Bubble Sort", 
        step: () => {
            let result = [...array];
            let nextStep = (step+1)%array.length;
            let swapped = false;
    
            if(nextStep == 0){
                if(!extraData.changed) {setSorting(false);}
                extraData.changed = false;
                setState({array: result, step: nextStep})
                return;
            }

            if(result[nextStep] < result[nextStep-1]){
                result = swapElements(result, nextStep, nextStep-1);
                swapped = true;
                extraData.changed = true;
            }
    
            setState({array: result, step: nextStep, count: count + 1, changeCount: changeCount + (+swapped)});
        }},
        
        //quicksort = 4
        {name: "Quick Sort",
        step: (left:number, right:number, lowEnd=-1)=>{
            let result = [...array];
            
        }}
    ];
    
    
    return(
        <>
            <OptionsBar setSelectedSort={(sort:SortAlgorithm) => setSelectedSort(sort)} selectedSort={selectedSort} sorters={sorters} arraySize={arraySize} setArraySize={(size:number) => setArraySize(size)}/>
            <ArrayVisualizer array={array}/>
            <div className={styles.buttonContainer}>
                <button className={`${styles.btn} ${styles.sortBtn} ${styles.primaryBtn}`} onClick={startSort} disabled={isSorting || isSorted(array)}>SORT</button>
                <div className={styles.countDisplay}>Number of comparisons: {count}</div>
                <div className={styles.countDisplay} >Number of changes: {changeCount}</div> 
                <button className={`${styles.btn} ${styles.resetBtn} ${styles.primaryBtn}`} onClick={() => {reset()}}>RESET</button>
            </div>
        </>
    )
}