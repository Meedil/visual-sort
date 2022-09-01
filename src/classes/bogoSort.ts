import { isSorted, shuffle } from "../preparation";
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
        this.arrayEditsCount += this.array.length;
        return {array: result};
    }

    getCurrentStep() {
        
    }
}