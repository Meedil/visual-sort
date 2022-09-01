import { color } from "../colors";
import { sorter } from "./sorter";



export class heapSort extends sorter{
    stepStack:number[];
    heapifyOffset:number;
    
    heapified:boolean;
    sorted:boolean;
    
    constructor(){
        super();
        this.array = [];
        this.name="Heap Sort";
    }
    
    reset(): void {
        this.stepStack = [];
        this.heapified = false;
        this.heapifyOffset = 0;
    }

    //heap node functions
    getLeft(position:number){
        return this.heapifyOffset + (position-this.heapifyOffset)*2+1;
    }
    getRight(position:number){
        return this.heapifyOffset + (position-this.heapifyOffset)*2+2;
     }
    hasLeft(position:number){
        return this.getLeft(position) < this.array.length;
    }
    hasRight(position:number){
        return this.getRight(position) < this.array.length;
    }
    
    executeStep() {
        if(this.isSorted()) {return {array: this.array};}
        if(!this.heapified){
            if(this.stepStack.length === 0) this.prepareHeapify();
            return this.heapifyStep();
        } 

        this.swap(this.heapifyOffset, this.array.length-1);            
        this.heapified = false;
        
        return {array: [...this.array]};
    }

    heapify(){
        while(!this.heapified){
            this.heapifyStep();
        }
        this.swap(this.heapifyOffset, this.array.length-1);            
        this.heapified = false;
    }

    prepareHeapify(position:number=0+this.heapifyOffset){        
        let left = this.hasLeft(position), right = this.hasRight(position);
        if(left || right){
            this.stepStack.push(position);
            if(left)
                this.prepareHeapify(this.getLeft(position))
            if(right)
                this.prepareHeapify(this.getRight(position))
        }
    }

    heapifyStep(){
        let position:number = this.getHeapifyStep();
        let hasright = this.hasRight(position);
        let min: 'left'|'right' = 'left';
        let minPos = () => (min === 'left') ? this.getLeft(position) : this.getRight(position);
        
        if(hasright){
            min = this.array[this.getRight(position)] < this.array[this.getLeft(position)] ? 'right' : 'left';
        }

        if(this.array[position] > this.array[minPos()]){
            this.swap(position, minPos());
            
            if(this.hasLeft(minPos())){
                this.stepStack.push(minPos());
            }
        }
        
        if(this.stepStack.length === 0){
            this.heapified = true;
            this.heapifyOffset++;
        }

        return {array: [...this.array], colors: [
            {index: position, color: color.red},
            {index: this.heapifyOffset, color: color.green},
            {index: this.getLeft(position), color: color.red},
            {index: this.hasRight(position) ? this.getRight(position) : -1, color: color.red}
        ]}
    }

    getHeapifyStep(){
        return this.stepStack.pop();
    }

    isSorted(): boolean {
        return this.array.length - this.heapifyOffset === 1;
    }
}