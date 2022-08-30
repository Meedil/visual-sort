import { ValueBar } from "./ValueBar";
import style from "./ArrayVisualizer.module.css";    
import { color, colorTupple } from "../colors";

interface ArrayVisualizerProps{
    array: number[];
    colors: colorTupple[];
}

export default function ArrayVisualizer({array, colors}:ArrayVisualizerProps){
    const gap = 1/array.length;
    const barColors = new Array(array.length).fill(color.blue);
    for(let c of colors){
        barColors[c.index] = c.color;
    }
    
    const bars = array.map((height, index) => <ValueBar 
    color = {barColors[index]} 
    height={(height/array.length) * 100} gap={gap} 
    first={index === 0} />);

    return(
        <div className={style.container}>
            {bars}
        </div>
    )
}