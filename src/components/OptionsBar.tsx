import styles from './OptionsBar.module.css';
import {SortAlgorithm, sorter} from '../scripts/sorting';

interface OptionsBarProps{
    selectedSort: SortAlgorithm,
    setSelectedSort: Function,
    sorters: sorter[],
}

export default function OptionsBar ({selectedSort, setSelectedSort, sorters}:OptionsBarProps){

    const dropdownItems = sorters.map((s:sorter, index:number) => {
        return <div className={styles.dropdownItem} onClick={() => setSelectedSort(index)}>{s.name}</div>
    })

    return(
        <div className={styles.container}>
            <div className={styles.dropdownContainer}>
                {dropdownItems}
            </div>
        </div>
    )
}