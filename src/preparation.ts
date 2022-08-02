export const timePerStep = 5;

export const shuffle = (array:any[]) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
export const isSorted = (array:number[], ascending = true) => {
    for(let i = 1; i < array.length; i++){
        if(ascending) {
            if(array[i] < array[i-1]){
                return false;
            }
        }
        else if (array[i] > array[i-1]){
            return false;
        }
    }
    return true;
}

interface range{
    min: number,
    max: number,
}

/**
 * Generates random array
 * @param {number} n size of array
 * @param {boolean} oneToN array values should be all values form 1 to n
 * @param {range | undefined} numRange range of the random numbers if oneToN is false
 */
 const generateArray = (n:number, oneToN:boolean = true, numRange?:range) => {
    let array:number[] = new Array(n ? parseInt(n.toString()) : 1);
    
    if(oneToN){
        for (let i = 0; i < array.length; i++) {
            array[i] = i+1;
        }
        array = shuffle(array);
    } else {
        array = array.map(() => Math.floor(Math.random()*(numRange.max-numRange.min) + numRange.min));
    }
    
    return array;
}

export default generateArray;