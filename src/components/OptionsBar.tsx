import styles from './OptionsBar.module.css';
import { sorter } from '../classes/sorter';
import { SortAlgorithm } from '../classes/sorters';
import { useState, useEffect } from 'react';
import { maxTime, minTime } from './VisualSort';
import { isSorted } from '../utilities';


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

    oneToN:boolean,
    setOneToN:Function,
}

export default function OptionsBar ({selectedSort, setSelectedSort, sorters, arraySize, setArraySize, timePerStep,
setTimePerStep, resetArray, sorted, oneToN, setOneToN}:OptionsBarProps){
    const calculateSpeed = (time:number) => {
        let speed = (99*(time - maxTime) + (minTime-maxTime)) / (minTime - maxTime);
        return speed;
    }
    const [speed, setSpeed] = useState(calculateSpeed(timePerStep));

    const dropdownItems = 
    <div className={styles.dropdownItemsContainer+" cleanScrollBar"}>{
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

            <label htmlFor="oneToN-on" className={styles.label}>One To N</label> 
            <input className={styles.radio} type="radio" name="oneToN" id="oneToN-on" value="true"  onChange={() => setOneToN(true)} checked={oneToN}/>
            <label htmlFor="oneToN-off" className={styles.label}>Random from Range</label> 
            <input className={styles.radio} type="radio" name="oneToN" id="oneToN-off" value="false" onChange={() => setOneToN(false)} checked={!oneToN}/>

            <label htmlFor="time-per-step" className={styles.label}>Sorting Speed</label>
            <div className={styles.sliderContainer}>
                <input type="range" name="array-size" min="1" max="100" id="timePerStepSlider" className={styles.slider} value={speed} onInput={(e) => {setSpeed(parseInt((document.getElementById("timePerStepSlider") as HTMLInputElement).value))}}/>
            </div>
        </div>  
    )
}