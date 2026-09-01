import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>

      <h1 className={styles.logo}>
        bookly
      </h1>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          A
        </div>

        <div className={styles.info}>
          <strong>관리자</strong>
          <span>Admin</span>
        </div>
      </div>

    </header>
  )
}

export default Header
