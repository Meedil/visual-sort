import { ValueBar } from "./ValueBar";
import style from "./ArrayVisualizer.module.css";    
import { color, colorTupple } from "../colors";
import { SortAlgorithm } from "../classes/sorters";

interface ArrayVisualizerProps{
    array: number[];
    colors: colorTupple[];
    selectedSort: SortAlgorithm;
    max: number;
}

export default function ArrayVisualizer({array, colors, selectedSort, max}:ArrayVisualizerProps){
    const gap = 1/array.length;
    const barColors = new Array(array.length).fill(color.blue);
    for(let c of colors){
        barColors[c.index] = c.color;
    }
    
    const bars = array.map((height, index) => <ValueBar 
        key = {index.toString()}
        color = {barColors[index]} 
        height={(height/max) * 100}
        selectedSort={selectedSort}
    />);

    return(
        <div className={style.container}>
            {bars}
        </div>
    )
}