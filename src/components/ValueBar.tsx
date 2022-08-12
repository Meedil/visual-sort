import { StyleSheet, css } from "aphrodite";

interface ValueBarProps{
    height: number;
    gap: number;    
    first: boolean;
}

export const ValueBar = ({height, gap, first}:ValueBarProps) => {
    const style = StyleSheet.create({
        default:{
            width: "100%",
            backgroundColor: "#37b",
            marginLeft: !first ? gap + "%" : 0,
        },
        h:{
            height: height + '%',
        }
    })

    return <div className={css(style.default, style.h)}></div>
}