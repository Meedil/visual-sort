import { color, colorTupple } from "../colors";
import { sorter, sortResult } from "./sorter"

interface step{
    gap:number;
    i:number;
    j?:number;
}

export class shellSort extends sorter{
    step:step;

    constructor(){
        super();
        this.name="Shell Sort";
    }
    executeStep(): sortResult {
        if(this.isSorted()) return {array: this.array}
        
        const {gap, i} = this.getCurrentStep();
        this.insertInPosition(i, gap);

        const colors:colorTupple[]  = Array(Math.floor(i/gap) + +(i%gap>0));
        let pos = 0;
        for(let j = i; j >= 0; j-=gap){
            colors[pos] = {index: j, color: color.red}
            pos++;
        }

        return {array: [...this.array], 
            colors:
            colors.concat({index: i, color:color.green})
        }
    }
    getCurrentStep(){
        const current = {...this.step}
        this.step.i = (this.step.i+1)%(this.array.length);
        if(this.step.i === 0){this.step.gap=Math.floor(this.step.gap/2); this.step.i += this.step.gap}
        return current;
    }
    insertInPosition(index:number, gap:number){
        const temp = this.array[index];
            let j;
            for(j = index; j >= gap && this.array[j-gap] > temp; j-= gap){
                this.array[j] = this.array[j-gap];
            }
            this.array[j] = temp;
    }
    passArray(array: number[]): void {
        super.passArray(array);
        this.step.gap = Math.floor(array.length/2);
        this.step.i = this.step.gap;
    }
    reset(): void {
        this.step = {gap: 0, i: 0, j: 0}
    }
    isSorted(): boolean {
        return this.step.gap === 0;
    }
}