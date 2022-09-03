import { bogoSort } from "./bogoSort";
import { bubbleSort } from "./bubbleSort";
import { heapSort } from "./heapSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { selectionSort } from "./selectionSort";
import { shellSort } from "./shellSort";
import { sorter } from "./sorter";

export enum SortAlgorithm{
    bogoSort,
    insertionSort,
    selectionSort,
    bubblesort,
    quickSort,
    mergeSort,
    heapSort,
    shellSort
}

const sorters:sorter[] = [];

sorters[SortAlgorithm.bogoSort] = new bogoSort();
sorters[SortAlgorithm.bubblesort] = new bubbleSort();
sorters[SortAlgorithm.insertionSort] = new insertionSort();
sorters[SortAlgorithm.selectionSort] = new selectionSort();
sorters[SortAlgorithm.quickSort] = new quickSort();
sorters[SortAlgorithm.mergeSort] = new mergeSort();
sorters[SortAlgorithm.heapSort] = new heapSort();
sorters[SortAlgorithm.shellSort] = new shellSort();

export default sorters;