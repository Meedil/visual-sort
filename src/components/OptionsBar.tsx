import styles from './OptionsBar.module.css';
import {SortAlgorithm, sorter} from '../scripts/sorting';

interface OptionsBarProps{
    selectedSort: SortAlgorithm,
    setSelectedSort: Function,
    sorters: sorter[],
    arraySize:number,
    setArraySize:Function, 
}

export default function OptionsBar ({selectedSort, setSelectedSort, sorters, arraySize, setArraySize}:OptionsBarProps){

    const dropdownItems = sorters.map((s:sorter, index:number) => {
        return <div className={styles.dropdownItem + ' ' + (index == selectedSort ? styles.selectedDropdownItem : null)} onClick={() => setSelectedSort(index)}>{s.name}</div>
    })

    return(
        <div className={styles.container}>
            <div className={styles.dropdownContainer}>
                {dropdownItems}
            </div>
            <label htmlFor="array-size" className={styles.label}>Size of Array</label>
            <input name='array-size' type="number" value={arraySize} onChange={(e) => { setArraySize(e.target.value); } } className={styles.arraySize} />

            <label htmlFor="time-per-step" className={styles.label}>Time per step</label>
            <div className={styles.sliderContainer}><input type="range" name="array-size" min="0.01" max="1" className={styles.slider} /></div>
        </div>
    )
}