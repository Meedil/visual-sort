import './OptionsBar.css';
import { sorter } from '../classes/sorter';
import { SortAlgorithm } from '../classes/sorters';
import { useState, useEffect } from 'react';
import { maxTime, minTime } from './VisualSort';
import { isSorted } from '../utilities';
import React from 'react';


interface OptionsBarProps{
    selectedSort: SortAlgorithm,
    setSelectedSort: Function,
    sorters: sorter[],
    arraySize:number,
    setArraySize:Function, 
    timePerStep:number,
    setTimePerStep:Function,
    resetArray:Function,
    sorting: boolean,

    oneToN:boolean,
    setOneToN:Function,
}

const DdItem = React.forwardRef((props:any, ref:any) => {
    return <div ref={ref} {...props}>{props.children}</div>
})

const selectedDdItem = React.createRef();

export default function OptionsBar ({selectedSort, setSelectedSort, sorters, arraySize, setArraySize, timePerStep,
setTimePerStep, resetArray, sorting, oneToN, setOneToN}:OptionsBarProps){
    const calculateSpeed = (time:number) => {
        let speed = (99*(time - maxTime) + (minTime-maxTime)) / (minTime - maxTime);
        return speed;
    }
    const [speed, setSpeed] = useState(calculateSpeed(timePerStep));

    const dropdownItems = 
    <div className={"dropdownItemsContainer cleanScrollBar"}>{
        sorters.map((s:sorter, index:number) => {
            return (
                <DdItem className={'dropdownItem ' + (index === selectedSort ? 'selectedDropdownItem' : '')} 
                    onClick={() => {if(index === selectedSort) return; setSelectedSort(index);}}
                    key={s.name}
                    ref={index === selectedSort ? selectedDdItem : null}
                >
                    {s.name}
                </DdItem>    
            )
        })
    }</div>

    useEffect(() => {
        setTimePerStep(speed);
    }, [speed]);

    useEffect(() => {
        const outOfDropdownHandler = (e) => {
            const dropdownButton:any = selectedDdItem.current;

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
        if(!dropped && sorting) return;
        dropdown.setAttribute('data-dropped', String(!dropped));
    } 

    return(
        <div className={'container'}>
            <div id='sort-dropdown' data-dropped="false" className={'dropdownContainer'} onClick={() => toggleSortDropdown()}>
                {dropdownItems}
            </div>

            <label htmlFor="array-size" className={'label'}>Size of Array</label>
            <input name='array-size' type="number"
                value={arraySize}
                onChange={(e) => {setArraySize(e.target.value);}}
                onKeyDown={(e) => {if(e.key.toLowerCase() === "enter"){resetArray()}}}
                className={'arraySize'}
            />

            <label htmlFor="oneToN-on" className={'label'}>One To N</label> 
            <input className={'radio'} type="radio" name="oneToN" id="oneToN-on" value="true"  onChange={() => setOneToN(true)} checked={oneToN}/>
            <label htmlFor="oneToN-off" className={'label'}>Random from Range</label> 
            <input className={'radio'} type="radio" name="oneToN" id="oneToN-off" value="false" onChange={() => setOneToN(false)} checked={!oneToN}/>

            <label htmlFor="time-per-step" className={'label'}>Sorting Speed</label>
            <div className={'sliderContainer'}>
                <input type="range" name="array-size" min="1" max="100" id="timePerStepSlider" className={'slider'} value={speed} onInput={(e) => {setSpeed(parseInt((document.getElementById("timePerStepSlider") as HTMLInputElement).value))}}/>
            </div>  
        </div>  
    )
}