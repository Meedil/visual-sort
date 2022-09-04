import { color, colorTupple } from "../colors";
import { sorter, sortResult } from "./sorter";
const base = 10;

export class radixSort extends sorter{
    static get base(){return base};
    divisor = base;
    map:number[][];
    newArr:number[];
    iHashing:number;    //counter for hashing
    iWriting:number;    //counter for writing

    constructor(){
        super();
        this.name = "Radix Sort";
    }
    executeStep(): sortResult {
        if(this.isSorted()) return {array: this.array}

        const colors:colorTupple[] = [];

        if(this.iHashing < this.array.length){ //hash depending on the last digit
            const key = Math.floor((this.array[this.iHashing]%this.divisor)/(this.divisor/radixSort.base));
                        
            this.map[key] = this.map[key].concat(this.array[this.iHashing]);
            
            if(this.iHashing++ === this.array.length - 1)
                for(let a of this.map){
                    this.newArr.push(...a);
                }
            
            colors.push({index: this.iHashing, color: color.red})
        }else if(this.iWriting < this.array.length){
            this.array[this.iWriting] = this.newArr[this.iWriting++];
            colors.push({index: this.iWriting, color: color.red})
        }else{
            this.map = new Array(radixSort.base).fill([]);
            this.newArr = [];
            this.iHashing = 0;
            this.iWriting = 0;
            this.divisor *= radixSort.base;
        }        

        return {array: [...this.array], colors: colors}
    }

    isSorted(): boolean {
        return this.map[0].length === this.array.length;
    }

    reset(): void {
        super.reset();
        this.map = new Array(base).fill([]);
        this.newArr = [];
        this.divisor = radixSort.base;
        this.iHashing = 0;
        this.iWriting = 0;
    }
}