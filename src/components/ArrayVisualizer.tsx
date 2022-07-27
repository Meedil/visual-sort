import { ValueBar } from "./ValueBar";
import style from "./ArrayVisualizer.module.css";    

// const barHeightScaleFactor = 5;


interface ArrayVisualizerProps{
    array: number[];
}

export default function ArrayVisualizer({array}:ArrayVisualizerProps){
    const bars = array.map((height, index) => <ValueBar height={(height/array.length) * 100} first={index == 0} />);

    return(
        <div className={style.container}>
            {bars}
        </div>
    )
}