import { StyleSheet, css } from "aphrodite";
import { SortAlgorithm } from "../classes/sorters";

interface ValueBarProps{
    height: number;
    gap: number;    
    first: boolean;
    color: object;
    selectedSort: SortAlgorithm;
}

export const ValueBar = ({height, gap, first, color, selectedSort}:ValueBarProps) => {

    const style = StyleSheet.create({
        default:{
            width: "100%",
            marginLeft: !first ? gap + "%" : 0,
            transition: selectedSort !== SortAlgorithm.bogoSort ? 'height 100ms' : 'height 10ms'
        },
        h:{
            height: height + '%',
        }
    })

    return <div className={css(style.default, style.h, color)}></div>
}