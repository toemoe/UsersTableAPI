import styles from './Footer.module.css'

interface FooterProps {
  onLoadMore: () => void
}

const Footer = ({onLoadMore}: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <button onClick={onLoadMore} className={styles.loadMoreButton}>Load More</button>
    </footer>
  )
}

export default Footer