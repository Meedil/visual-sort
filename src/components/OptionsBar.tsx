import styles from './OptionsBar.module.css';
import { sorter } from '../classes/sorter';
import { SortAlgorithm } from '../classes/sorters';
import { useState, useEffect } from 'react';
import { maxTime, minTime } from './VisualSort';


interface OptionsBarProps{
    selectedSort: SortAlgorithm,
    setSelectedSort: Function,
    sorters: sorter[],
    arraySize:number,
    setArraySize:Function, 
    timePerStep:number,
    setTimePerStep:Function
}

export default function OptionsBar ({selectedSort, setSelectedSort, sorters, arraySize, setArraySize, timePerStep,
setTimePerStep}:OptionsBarProps){
    const calculateSpeed = (time:number) => {
        let speed = (99*(time - maxTime) + (minTime-maxTime)) / (minTime - maxTime);
        return speed;
    }
    const [speed, setSpeed] = useState(calculateSpeed(timePerStep));

    const dropdownItems = sorters.map((s:sorter, index:number) => {
        return <div className={styles.dropdownItem + ' ' + (index === selectedSort ? styles.selectedDropdownItem : null)} onClick={() => setSelectedSort(index)}>{s.name}</div>
    })

    useEffect(() => {
        setTimePerStep(speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed]);

    return(
        <div className={styles.container}>
            <div className={styles.dropdownContainer}>
                {dropdownItems}
            </div>
            <label htmlFor="array-size" className={styles.label}>Size of Array</label>
            <input name='array-size' type="number" value={arraySize} 
                onChange={(e) => {setArraySize(e.target.value); } } 
                className={styles.arraySize} 
            />

            <label htmlFor="time-per-step" className={styles.label}>Sorting Speed</label>
            <div className={styles.sliderContainer}><input type="range" name="array-size" min="1" max="100" id="timePerStepSlider" className={styles.slider} value={speed} onInput={(e) => {setSpeed(parseInt((document.getElementById("timePerStepSlider") as HTMLInputElement).value))}}/></div>
        </div>
    )
}