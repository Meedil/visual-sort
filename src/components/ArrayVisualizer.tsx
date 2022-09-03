import { ValueBar } from "./ValueBar";
import style from "./ArrayVisualizer.module.css";    
import { color, colorTupple } from "../colors";
import { SortAlgorithm } from "../classes/sorters";

interface ArrayVisualizerProps{
    array: number[];
    colors: colorTupple[];
    selectedSort: SortAlgorithm;
}

export default function ArrayVisualizer({array, colors, selectedSort}:ArrayVisualizerProps){
    const gap = 1/array.length;
    const barColors = new Array(array.length).fill(color.blue);
    for(let c of colors){
        barColors[c.index] = c.color;
    }
    
    const bars = array.map((height, index) => <ValueBar 
        color = {barColors[index]} 
        height={(height/array.length) * 100} gap={gap} 
        first={index === 0}
        selectedSort={selectedSort}
    />);

    return(
        <div className={style.container}>
            {bars}
        </div>
    )
}