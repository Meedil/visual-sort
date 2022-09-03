import { color, colorTupple } from "../colors";
import { shuffle } from "../utilities";
import { sorter } from "./sorter";

export class bogoSort extends sorter{
    constructor(){
        super();

        this.name = "Bogosort";
    }

    executeStep() {
        if(this.isSorted()) return {array: this.array}; 

        let result = [...this.array];
        shuffle(result);
        this.array = result;
        this.stepCount++;
        this.comparisonCount += this.array.length;

        const colors:colorTupple[] = new Array(Math.floor(this.array.length/2));
        for(let i = 0; i < this.array.length/2; i++){
            colors[i] = {index: Math.floor(Math.random()*this.array.length), color: color.red};
        }

        return {
            array: result, 
            colors: colors,
            stepCount: this.stepCount,
            comparisonCount: this.comparisonCount
        };
    }

    getCurrentStep() {
        
    }
}