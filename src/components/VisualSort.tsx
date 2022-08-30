/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import { color, colorTupple } from "../colors";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted } from "../preparation";
import sorters, { SortAlgorithm } from "../classes/sorters";

import styles from "./VisualSort.module.css";

interface visualSortState{
    array?: number[],               //Array on display
    colors?: colorTupple[],         //Holds colors for different 
    step?: number,                  //Current step of on-going sorting
    count?: number,                 //Number of comparisons 
    changeCount?:number,            //Number of steps done
    isSorting?: boolean,            //Status of whether or not sorting is currently ongoing
    extraData?: any
    selectedSort?:SortAlgorithm,
}

export const maxTime = 700, minTime = 1;


const loadedSort:SortAlgorithm = localStorage.getItem("selectedSort") == null ? 0 : parseInt(localStorage.getItem("selectedSort"));
const loadedArraySize:number = localStorage.getItem("arraySize") == null ? 5 : parseInt(localStorage.getItem("arraySize"));
const initialArray = generateArray(loadedArraySize, false);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadedTimePerStep:number = localStorage.getItem("timePerStep") == null ? 100 : parseInt(localStorage.getItem("timePerStep"));

export default function VisualSort(props){
    //OPTION STATE VARIABLES
    const [arraySize, setArraySize] = useState<number>(loadedArraySize);
    const [selectedSort, setSelectedSort] = useState(loadedSort); 
    const [timePerStep, setTimePerStep] = useState(100);
    const [perfectLine, setPerfectLine] = useState(true);
    //SORTING STATE VARIABLES
    const [array, setArray] = useState(initialArray);
    const [colors, setColors] = useState([])
    const [count, setCount] = useState(0);
    const [changeCount, setChangeCount] = useState(0);
    const [isSorting, setSorting] = useState(false);

    const setState = ({array, colors, count, changeCount, isSorting, selectedSort}:visualSortState) => {
        //Sorting state-vars
        (array !== undefined) && setArray(array);
        (colors !== undefined) && setColors(colors);
        (count !== undefined) && setCount(count);
        (changeCount !== undefined) && setChangeCount(changeCount);
        (isSorting !== undefined) && setSorting(isSorting);
        //Options state-vars
        (selectedSort !== undefined) && setSelectedSort(selectedSort);
    }

    useEffect(() => {
        reset();
    }, []);

    //Calles setTime out to carry out sorting steps
    useEffect(() => {
        setTimeout(() => {
            if(isSorting){
                setState(sorters[selectedSort].executeStep());
            }
        }, timePerStep);
        if(sorters[selectedSort].isSorted()) {setColors([]); setSorting(false);};
    }, [isSorting, array]);

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
        // setArray(sorters[selectedSort].executeStep());
    }

    const reset = () => {
        const newArray = autoGenerateArray();
        setState({
            array: newArray, 
            colors: [],
            step: 0, 
            count: 0, 
            changeCount: 0, 
            isSorting: false,
            extraData: {}
        });
        
        sorters[selectedSort].reset();
        sorters[selectedSort].passArray(newArray);
    }
    
    const calculateTimePerStep = (speed:number) => {
        let time = (minTime - maxTime)/99*speed + maxTime+(maxTime-minTime)/99; //calculate time using a linear function
        return time;
    }

    const selectSort = (alg:SortAlgorithm) => {
        sorters[alg].passArray(array);
        setSelectedSort(alg);
    }

    const autoGenerateArray = () => {
        return generateArray(arraySize, perfectLine);
    }
    
    return(
        <>
            <OptionsBar 
                setSelectedSort={(sort:SortAlgorithm) => selectSort(sort)} 
                selectedSort={selectedSort} 
                sorters={sorters} 
                arraySize={arraySize} 
                setArraySize={(size:number) => setArraySize(size)} 
                timePerStep={timePerStep}
                setTimePerStep={speed => setTimePerStep(Math.round(calculateTimePerStep(speed)))} 
                resetArray={() => {reset()}}
            />
            <ArrayVisualizer array={array} colors={colors}/>
            <div className={styles.buttonContainer}>
                <button className={`${styles.btn} ${styles.sortBtn} ${styles.primaryBtn}`} onClick={startSort} disabled={isSorting || isSorted(array)}>SORT</button>
                <div className={styles.countDisplay}>Number of comparisons: {count}</div>
                <div className={styles.countDisplay} >Number of changes: {changeCount}</div> 
                <button className={`${styles.btn} ${styles.resetBtn} ${styles.primaryBtn}`} onClick={() => {reset()}}>RESET</button>
            </div>
        </>
    )
}