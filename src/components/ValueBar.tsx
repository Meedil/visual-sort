import { StyleSheet, css } from "aphrodite";
import { useState } from "react";
import { color as C} from '../colors';

interface ValueBarProps{
    height: number;
    gap: number;    
    first: boolean;
    color: object;
}

export const ValueBar = ({height, gap, first, color}:ValueBarProps) => {

    const style = StyleSheet.create({
        default:{
            width: "100%",
            marginLeft: !first ? gap + "%" : 0,
            transition:'height 100ms'
        },
        h:{
            height: height + '%',
        }
    })

    return <div className={css(style.default, style.h, color)}></div>
}