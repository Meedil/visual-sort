import './OptionsBanner.css';
import { useEffect, useRef, useState } from "react";
import { sorter } from "../classes/sorter";
import sorters, { SortAlgorithm } from "../classes/sorters";
import menuIcon from '../icons/bars-solid.svg';
import { maxTime, minTime } from "./VisualSort";


// SUBCOMPONENTS
function ArraySizeInput({arraySize, setArraySize, reset}){
    return(
        <div className="option-field array-size-field">
            <label htmlFor="array-input" className='field-label array-size-label'>Array Size </label>
            <input type="number" value={arraySize} onChange={e => setArraySize(e.target.value)} onKeyDown={(e) => {if(e.key.toLowerCase() === "enter") {reset();}}}/>
        </div>
    )
}

//Speed Slider Utilities
const sliderMax = 100;
const loadedSortSpeed = localStorage.getItem("sortSpeed") !== null ? parseInt(localStorage.getItem("sortSpeed")) : 75;
const calculateTimePerStep = (speed:number) => {
    const slope = (maxTime-minTime)/sliderMax;
    return -slope*speed + maxTime;
}
function SpeedSlider({setTimePerStep}){
    const [speed, setSpeed] = useState(loadedSortSpeed);
    
    useEffect(() => {
        localStorage.setItem("sortSpeed", String(speed));
        setTimePerStep(calculateTimePerStep(speed));
    },[speed]);

    return(
        <div className="option-field speed-field">
            <label className='field-label speed-label' htmlFor="sorting-speed">Speed</label>
            <input type="range" name="sortingSpeed" id="sorting-speed" value={speed} onChange={(v) => setSpeed(parseInt(v.target.value))}/>
        </div>
    )
}

function ValueOptions({oneToN, setOneToN, generationRangeMin, generationRangeMax, setGenerationRangeMin, setGenerationRangeMax, reset}){
    return(
        <div className="options-field values-field">
            <div className='one-to-n'>
                <div className="tooltip">
                    <input type="radio" name="oneToN" id="oneToN-on" checked={oneToN} onChange={() => setOneToN(true)} className="oneToN-option"/>
                    <label htmlFor="oneToN-on">1, 2, 3... <em>n</em></label>
                    <div className="tooltip-text"><em>n </em>is the array size</div>
                </div>
            </div>
            <div className='random-values'>
                <div>
                    <input type="radio" name="oneToN" id="oneToN-off" checked={!oneToN} onChange={() => setOneToN(false)} className="oneToN-option"/>
                </div>
                <label htmlFor='oneToN-off' className='range-input'>
                    <div>
                        <label htmlFor="range-min">from </label>
                        <input className='range-number' type="number" min={1} value={generationRangeMin} onChange={e => setGenerationRangeMin(parseInt(e.target.value))} id="range-min" disabled={oneToN} onKeyDown={(e) => {if(e.key.toLowerCase()==="enter"){reset()}}}/>
                    </div>
                    <div>
                        <label htmlFor="range-max">to </label>
                        <input className="range-number" type="number" min={generationRangeMin} value={generationRangeMax} onChange={e => setGenerationRangeMax(parseInt(e.target.value))} id="range-max" disabled={oneToN} onKeyDown={(e) => {if(e.key.toLowerCase()==="enter"){reset()}}}/>
                    </div>
                </label>
            </div>
        </div>
    )
}

function RandomnessOption({generationIsRandom, setGenerationIsRandom}){
    return (
        <div className="field-option randomness-option">
            <span className="field-lable">Generate Random?</span>
            <div className='option-input'>
                <label htmlFor="random-true">Yes</label><input type="radio" name="randomness" id="random-true" /><label htmlFor="random-false">No</label><input type="radio" name="randomness" id="random-false" />
            </div>
        </div>
    )
}

interface OptionsBannerProps{
    selectedSort:SortAlgorithm;
    selectSort:Function;
    arraySize:number;
    setArraySize:Function;
    reset:Function;
    setTimePerStep:Function;
    oneToN:boolean;
    setOneToN:Function;
    generationRangeMin:number;
    generationRangeMax:number;
    setGenerationRangeMin:Function;
    setGenerationRangeMax:Function;
    disabled:boolean;
}

export function OptionsBanner({selectedSort, selectSort, arraySize, setArraySize, oneToN, setOneToN, setTimePerStep, disabled, reset, ...props}:OptionsBannerProps){
    const collapseRef = useRef();
    const toggleOptionsVisibility = () => {
        const collapseList:HTMLElement = collapseRef.current;
        if(collapseList.clientHeight){
            hideOptions();
        }
        else{
            showOptions();
        }
    }
    const hideOptions = () => {
        const collapseList:HTMLElement = collapseRef.current;
        let height = 0;
        const collapseChildren = collapseList.children;
        for(let i = 0; i < collapseChildren.length; i++){
            height += collapseChildren.item(i).clientHeight;
        }

        collapseList.style.height = `${height}px`;
        collapseList.classList.remove("h-fit", "show");
        collapseList.classList.add("h-0");
    }
    const showOptions = () => {
        const collapseList:HTMLElement = collapseRef.current;
        collapseList.classList.remove("h-0");
        collapseList.classList.add('h-fit', 'show');
    }
    useEffect(() => {
        hideOptions();
    }, [])

    const algorithmDropdown = <select className="option-field" name="sort-select" id="sort-select" value={selectedSort} onChange={(e) => {selectSort(e.target.value)}} disabled={disabled}>
        {sorters.map((s:sorter, index:number) => {
            return <option className='option' value={index} key={s.name}>{s.name}</option>
        })}
    </select>

    return(
        <div className="options-banner">
            {algorithmDropdown}
                <button className="menu-btn" onClick={toggleOptionsVisibility}>
                    <img src={menuIcon} alt="" className='menu-icon' />
                </button>
                <div className="collapse-container" ref={collapseRef}>
                    <div className={"options-list"} >
                            <ArraySizeInput arraySize={arraySize} setArraySize={setArraySize} reset={reset}/>
                            <SpeedSlider setTimePerStep={setTimePerStep}/>
                            <ValueOptions oneToN={oneToN} setOneToN={setOneToN}
                                generationRangeMin={props.generationRangeMin} generationRangeMax={props.generationRangeMax}
                                setGenerationRangeMin={props.setGenerationRangeMin} setGenerationRangeMax={props.setGenerationRangeMax}
                                reset={reset}
                            />
                    </div>
                </div>
        </div>
    )

}