import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className={styles['header']}>
      <Link className={styles['item']} to="/">Dashboard</Link>
      <Link className={styles['item']} to="transactions">Histórico</Link>
    </header>
  );
}

export default Navbar;
