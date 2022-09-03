import { StyleSheet } from "aphrodite";

export interface colorTupple {
    index: number;
    color: object;
}

export const color = StyleSheet.create({
    red:{
        backgroundColor: '#a22'
    },
    green:{
        backgroundColor: '#3a3'
    },
    blue:{
        backgroundColor: '#37b'
    }
})