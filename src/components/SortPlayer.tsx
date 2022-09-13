import './SortPlayer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faRotate, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { createRef, forwardRef, useEffect, useRef } from 'react';


const ResetButton = forwardRef(({reset}:any, ref) => {
    return <button className="player-btn reset-btn" onClick={reset} ref={ref as any}>
        <div className="btn-content">
            <FontAwesomeIcon icon={faRotate} />
        </div>
    </button>
})
    
const PlayPauseButton = forwardRef(({isSorting, isSorted, toggleSorting}:any, ref)=>{
    return <button disabled={isSorted} className="player-btn play-pause-btn" onClick={toggleSorting} ref={ref as any}>
        <div className={"btn-content " + (!isSorting ? 'play-btn-content' : 'pause-btn-content')}>
            <FontAwesomeIcon icon={isSorting ? faPause : faPlay}/>
        </div>
    </button>
});

const OneStepButton = forwardRef(({disabled, nextStep}:any, ref) => {
    return <button disabled={disabled} onClick={nextStep} className="player-btn one-step-button" ref={ref as any}>
            <div className="btn-content">
                <FontAwesomeIcon icon={faStepForward}/>
            </div>
    </button>
})

export function SortPlayer({isSorting, isSorted, toggleSorting, nextStep, reset, ...props}){
    const ppbutton = useRef(null);   //pausePlayButton
    const rbutton = useRef(null);    //resetButton
    const stepbutton = useRef(null); //nextStepButton
    
    useEffect(
        () => {
            const keyHandler = ({key}) =>{
                switch(key.toLowerCase()){
                    case 'r':
                        rbutton.current.click(); break;
                    case ' ':
                        ppbutton.current.click(); break;
                    case 'd':
                    case 'arrowright':
                        stepbutton.current.click(); break;
                }
            };
            window.addEventListener('keydown', keyHandler)

            return () => window.removeEventListener('keydown', keyHandler);
        }
    ,[])

    return(
        <div className="player-container">
            <div className='player'>
                <ResetButton
                    reset={reset}
                    ref={rbutton}
                />
                <PlayPauseButton
                    isSorting={isSorting}
                    isSorted={isSorted}
                    toggleSorting={toggleSorting}
                    ref={ppbutton}
                />
                <OneStepButton
                    disabled={isSorting || isSorted}
                    nextStep={nextStep}
                    ref={stepbutton}
                />
            </div>
        </div>
    )
}