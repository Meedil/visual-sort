import { bogoSort } from "./bogoSort";
import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { quickSort } from "./quickSort";
import { selectionSort } from "./selectionSort";
import { sorter } from "./sorter";

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort,
    quickSort
}

const sorters:sorter[] = [];

sorters[SortAlgorithm.bogoSort] = new bogoSort();
sorters[SortAlgorithm.bubblesort] = new bubbleSort();
sorters[SortAlgorithm.insertionSort] = new insertionSort();
sorters[SortAlgorithm.selectionSort] = new selectionSort();
sorters[SortAlgorithm.quickSort] = new quickSort();

export default sorters;