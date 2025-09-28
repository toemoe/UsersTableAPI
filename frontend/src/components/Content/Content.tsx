import styles from './Content.module.css'
import UserPage from '../Page/UserPage'
import UserListPage from '../Page/UserListPage'
import { Route, Routes } from 'react-router-dom'

const Content = () => {
  return (
    <main className={styles.landing}>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserPage />}/>
      </Routes>
    </main>
  )
}

export default Content