import { isSorted, shuffle } from "../preparation";
import { sorter } from "./sorter";

export class bogoSort extends sorter{
    constructor(){
        super();

        this.name = "Bogosort";
    }

    executeStep(): number[] {
        super.executeStep();

        let result = [...sorter.array];
        shuffle(result);
        this.arrayChanges += sorter.array.length;
        return result;
    }

    isSorted(): boolean {
        return isSorted(sorter.array);
    }
    getNextStep() {
        
    }
}