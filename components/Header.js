
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Header() {
 
  return (


<div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="Fleet_logo.png" alt="Letter logo" />
        </div>
        <Link href="/"><span className={styles.nav}>Films</span></Link>
        <Link href="/series"><span className={styles.nav}>Series</span></Link>
        <Link href="/espace-perso"><span style={{marginRight: '40%'}} className={styles.nav}>Espace personnel</span></Link>
      </div>

  )}