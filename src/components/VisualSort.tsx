import { useEffect, useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted, shuffle } from "../preparation";
import { SortAlgorithm, sorter} from "../classes/sorter";

import styles from "./VisualSort.module.css";

interface visualSortState{
    array?: number[],               //Array on display
    step?: number,                  //Current step of on-going sorting
    count?: number,                 //Number of comparisons 
    changeCount?:number,            //Number of steps done
    isSorting?: boolean,            //Status of whether or not sorting is currently ongoing
    extraData?: any
    selectedSort?:SortAlgorithm,
}

export const maxTime = 700, minTime = 10;

const loadedSort:SortAlgorithm = localStorage.getItem("selectedSort") == null ? 0 : parseInt(localStorage.getItem("selectedSort"));
const loadedArraySize:number = localStorage.getItem("arraySize") == null ? 5 : parseInt(localStorage.getItem("arraySize"));
const loadedTimePerStep:number = localStorage.getItem("timePerStep") == null ? 100 : parseInt(localStorage.getItem("timePerStep"));

export default function VisualSort(props){
    const [arraySize, setArraySize] = useState<number>(loadedArraySize);
    const [selectedSort, setSelectedSort] = useState(loadedSort); 
    const [timePerStep, setTimePerStep] = useState(100);

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
        let timer = setTimeout(() => {if(isSorting){sorters[selectedSort].executeStep();}}, timePerStep);
    }, [isSorting, array])

    //on load get from local storage
    useEffect(() => {
        setState({
            selectedSort: loadedSort,
        })        
    }, [])
    //on option state-var updates update, set localstorage
    useEffect(() => {   //update selectedSort in local storage
        localStorage.setItem("selectedSort", selectedSort.toString());
    }, [selectedSort])
    useEffect(() => {   //update arraySize in localstorage
        localStorage.setItem("arraySize", arraySize.toString());
    }, [arraySize]);
    useEffect(() => {   //update timePerStep in localstorage
        
        localStorage.setItem("timePerStep", timePerStep.toString());
    }, [timePerStep]);



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
        
    ];
    
    const calculateTimePerStep = (speed:number) => {
        let time = (minTime - maxTime)/99*speed + maxTime+(maxTime-minTime)/99; //calculate time using a linear function
        console.log(time);
        return time;
    }
    
    return(
        <>
            <OptionsBar 
                setSelectedSort={(sort:SortAlgorithm) => setSelectedSort(sort)} 
                selectedSort={selectedSort} 
                sorters={sorters} 
                arraySize={arraySize} 
                setArraySize={(size:number) => setArraySize(size)} 
                timePerStep={timePerStep}
                setTimePerStep={speed => setTimePerStep(Math.round(calculateTimePerStep(speed)))} 
            />
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