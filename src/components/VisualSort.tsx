/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import { colorTupple } from "../colors";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted } from "../utilities";
import sorters, { SortAlgorithm } from "../classes/sorters";

import styles from "./VisualSort.module.css";
import { OptionsBanner } from "./OptionsBanner";
import { SortPlayer } from "./SortPlayer";

interface visualSortState{
    array?: number[],               //Array on display
    colors?: colorTupple[],         //Holds colors for different 
    comparisonCount?: number,                 //Number of comparisons 
    stepCount?:number,            //Number of steps done
    isSorting?: boolean,            //Status of whether or not sorting is currently ongoing
    extraData?: any
    selectedSort?:SortAlgorithm,
}

export const maxTime = 200, minTime = 0.1;


const loadedSort:SortAlgorithm = localStorage.getItem("selectedSort") == null ? 0 : parseInt(localStorage.getItem("selectedSort"));
const loadedArraySize:number = localStorage.getItem("arraySize") == null ? 20 : parseInt(localStorage.getItem("arraySize"));
const initialArray = generateArray(loadedArraySize, false);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadedTimePerStep:number = localStorage.getItem("timePerStep") == null ? 100 : parseInt(localStorage.getItem("timePerStep"));
const loadedOneToN:boolean = localStorage.getItem("oneToN") == null ? true : (localStorage.getItem("oneToN") === "true");

export default function VisualSort(props){
    //OPTION STATE VARIABLES
    const [arraySize, setArraySize] = useState<number>(loadedArraySize);
    const [selectedSort, setSelectedSort] = useState(loadedSort); 
    const [timePerStep, setTimePerStep] = useState(loadedTimePerStep);
    const [oneToN, setOneToN] = useState(loadedOneToN);
    const [generationRangeMin, setGenerationRangeMin] = useState(1);
    const [generationRangeMax, setGenerationRangeMax] = useState(loadedArraySize);
    //SORTING STATE VARIABLES
    const [array, setArray] = useState(initialArray);
    const [colors, setColors] = useState([])
    const [comparisonCount, setCount] = useState(0);
    const [stepCount, setChangeCount] = useState(0);
    const [isSorting, setIsSorting] = useState(false);
    const [sorted, setSorted] = useState(false);

    const setState = ({array, colors, comparisonCount: count, stepCount: changeCount, isSorting, selectedSort}:visualSortState) => {
        //Sorting state-vars
        (array !== undefined) && setArray(array);
        (colors !== undefined) && setColors(colors);
        (count !== undefined) && setCount(count);
        (changeCount !== undefined) && setChangeCount(changeCount);
        (isSorting !== undefined) && setIsSorting(isSorting);
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
        if(sorters[selectedSort].isSorted()) {setColors([]); setIsSorting(false); setSorted(true)} 
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
    useEffect(() => {   //update oneToN in localstorage
        reset(); 
        localStorage.setItem("oneToN", String(oneToN));
    },[oneToN])

    const startSort = () => {
        setIsSorting(true);
        
    }

    const toggleSorting = () => {
        setIsSorting(!isSorting);
    }

    const nextStep =() => {
        setState(sorters[selectedSort].executeStep());
    }

    const reset = () => {        
        const newArray = autoGenerateArray();
        setState({
            array: newArray, 
            colors: [],
            comparisonCount: 0, 
            stepCount: 0, 
            isSorting: false,
            extraData: {}
        });
        
        setSorted(isSorted(newArray));
        sorters[selectedSort].reset();
        sorters[selectedSort].passArray(newArray);

        return newArray;
    }
    
    const calculateTimePerStep = (speed:number) => {
        let time = (minTime - maxTime)/99*speed + maxTime+(maxTime-minTime)/99; //calculate time using a linear function
        return time;
    }

    const selectSort = (alg:SortAlgorithm) => {
        let newArray:number[] = array;
        if(sorted) newArray = reset();

        sorters[alg].passArray(newArray);
        setSelectedSort(alg);
    }

    const autoGenerateArray = () => {
        return generateArray(arraySize, oneToN, generationRangeMin, generationRangeMax);
    }
    
    return(
        <>
            <OptionsBanner
                selectedSort={selectedSort}
                selectSort={(sort) => {selectSort(sort);}}
                arraySize={arraySize}
                setArraySize={(size) => setArraySize(size)}
                reset={() => reset()}
                setTimePerStep={(time) => {setTimePerStep(time);}}
                oneToN={oneToN}
                setOneToN={(value) => {setOneToN(value); if(value){setGenerationRangeMax(arraySize)}}}
                generationRangeMin={generationRangeMin}
                generationRangeMax={generationRangeMax}
                setGenerationRangeMin={setGenerationRangeMin}
                setGenerationRangeMax={setGenerationRangeMax}
                disabled={isSorting}
            />
            <ArrayVisualizer 
                array={array} 
                colors={colors} 
                selectedSort={selectedSort}
                max={generationRangeMax}
            />
            <SortPlayer
                isSorted={sorted}
                isSorting={isSorting}
                toggleSorting={toggleSorting}
                nextStep={nextStep}
                reset={reset}
            />
        </>
    )
}