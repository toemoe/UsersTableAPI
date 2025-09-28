import styles from './Filter.module.css'

interface FilterProps {
  nameFilter: string
  groupFilter: string
  setNameFilter: (name: string) => void
  setGroupFilter: (group: string) => void
}

const Filter = ({nameFilter, groupFilter, setNameFilter, setGroupFilter}: FilterProps) => {
  return (
    <div className={styles.filter}>
      <p>Filters</p>
      <label><input type="text" value={nameFilter} placeholder="name" onChange={e => setNameFilter(e.target.value)}></input></label>
      <label><input type="text" value={groupFilter} placeholder="group" onChange={e => setGroupFilter(e.target.value)}></input></label>
    </div>
  )
}

export default Filter