import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="pagination">
        1 2 3 4
        <button>next</button>
      </div>
    </footer>
  )
}

export default Footer