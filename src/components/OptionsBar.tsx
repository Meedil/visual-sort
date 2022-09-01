import styles from './OptionsBar.module.css';
import { sorter } from '../classes/sorter';
import { SortAlgorithm } from '../classes/sorters';
import { useState, useEffect } from 'react';
import { maxTime, minTime } from './VisualSort';
import { isSorted } from '../preparation';


interface OptionsBarProps{
    selectedSort: SortAlgorithm,
    setSelectedSort: Function,
    sorters: sorter[],
    arraySize:number,
    setArraySize:Function, 
    timePerStep:number,
    setTimePerStep:Function,
    resetArray:Function,
    sorted: boolean,
}

export default function OptionsBar ({selectedSort, setSelectedSort, sorters, arraySize, setArraySize, timePerStep,
setTimePerStep, resetArray, sorted}:OptionsBarProps){
    const calculateSpeed = (time:number) => {
        let speed = (99*(time - maxTime) + (minTime-maxTime)) / (minTime - maxTime);
        return speed;
    }
    const [speed, setSpeed] = useState(calculateSpeed(timePerStep));

    const dropdownItems = 
    <div className={styles.dropdownItemsContainer}>{
        sorters.map((s:sorter, index:number) => {
            return <div className={styles.dropdownItem + ' ' + (index === selectedSort ? styles.selectedDropdownItem : '')} onClick={() => {if(index === selectedSort) return; setSelectedSort(index);}}>{s.name}</div>
        })
    }</div>

    useEffect(() => {
        setTimePerStep(speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed]);

    useEffect(() => {
        const outOfDropdownHandler = (e) => {
            const dropdownButton = document.querySelector('.' + styles.selectedDropdownItem);

            if(e.target !== dropdownButton){
                document.getElementById('sort-dropdown').setAttribute('data-dropped', 'false');
            }
        };
        window.addEventListener('click', outOfDropdownHandler);
        return () => window.removeEventListener('click', outOfDropdownHandler);
      }, []); 

    const toggleSortDropdown = () => {
        const dropdown = document.getElementById('sort-dropdown');
        const dropped:boolean = dropdown.getAttribute('data-dropped') === "true";
        dropdown.setAttribute('data-dropped', String(!dropped));
    } 

    return(
        <div className={styles.container}>
            <div id='sort-dropdown' data-dropped="false" className={styles.dropdownContainer} onClick={() => toggleSortDropdown()}>
                {dropdownItems}
            </div>
            <label htmlFor="array-size" className={styles.label}>Size of Array</label>
            <input name='array-size' type="number"
                value={arraySize}
                onChange={(e) => {setArraySize(e.target.value);}}
                onKeyDown={(e) => {if(e.key.toLowerCase() === "enter"){resetArray()}}}
                className={styles.arraySize}
            />

            <label htmlFor="time-per-step" className={styles.label}>Sorting Speed</label>
            <div className={styles.sliderContainer}><input type="range" name="array-size" min="1" max="100" id="timePerStepSlider" className={styles.slider} value={speed} onInput={(e) => {setSpeed(parseInt((document.getElementById("timePerStepSlider") as HTMLInputElement).value))}}/></div>
        </div>  
    )
}