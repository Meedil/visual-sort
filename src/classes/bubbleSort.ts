import { sorter } from "./sorter";

export class bubbleSort extends sorter{
    constructor(){
        super();
        this.name = "Bubble Sort";
    }
    executeStep(): number[] {
        throw new Error("not yet implemented");
    }
}