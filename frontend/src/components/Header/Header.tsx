import styles from './Header.module.css'

const Header = () => {

  return (
    <header className={styles.Header}>
      <h1>UserApp</h1>
      <label>
        <input type="text" placeholder="Search"/>
      </label>
      <button>Add user</button>
    </header>
  )
}

export default Header