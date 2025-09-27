import styles from './Content.module.css'
import UserTable from './UserTable/UserTable'
import Filter from './Filter/Filter'

const Content = () => {
  return (
    <main className={styles.landing}>
      <Filter />
      <UserTable />
    </main>
  )
}

export default Content