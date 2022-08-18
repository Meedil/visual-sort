import { isSorted, shuffle } from "../preparation";
import { sorter } from "./sorter";

export class bogoSort extends sorter{
    constructor(){
        super();

        this.name = "Bogosort";
    }

    executeStep(): number[] {
        if(this.isSorted()) return this.array;

        let result = [...this.array];
        shuffle(result);
        this.array = result;
        this.arrayEditsCount += this.array.length;
        return result;
    }

    isSorted(): boolean {
        return isSorted(this.array);
    }
    getCurrentStep() {
        
    }
}