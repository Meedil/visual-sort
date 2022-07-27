import { useState } from "react";
import ArrayVisualizer from "./ArrayVisualizer";
import OptionsBar from "./OptionsBar";

import generateArray, { isSorted, timePerStep } from "../preparation";
import { sortStep, SortAlgorithm} from "../scripts/sorting";

import styles from "./VisualSort.module.css";

export default function VisualSort(props){
    const [arraySize, setArraySize] = useState<number>(10);
    const [array, setArray] = useState(generateArray(arraySize));
    const [step, setStep] = useState<number>();
    const [count, setCount] = useState(0);

    const [currentInterval, setCurrentInterval] = useState<number>();
    const [selectedSort, setSort] = useState(SortAlgorithm.selectionSort); 

    const reset = () => {
        setArray(generateArray(arraySize));
        setStep(undefined);
        setCount(0);
    }
    
    const startSort = () => {
        // setCurrentInterval(setInterval(sortStep[selectedSort], timePerStep, array, step));
        var result = sortStep[selectedSort](array, step);  
        setArray(result.array);
        setStep(result.step);
        setCount(count+result.countOffset);
    }

    return(
        <>
            <OptionsBar />
            <ArrayVisualizer array={array}/>
            <div className={styles.buttonContainer}>
                <button className={`${styles.btn} ${styles.sortBtn} ${styles.primaryBtn}`} onClick={startSort} disabled={isSorted(array)}>SORT <br />{count}</button>
                <button className={`${styles.btn} ${styles.resetBtn} ${styles.primaryBtn}`} onClick={reset}> RESET</button>
            </div>
        </>
    )
}