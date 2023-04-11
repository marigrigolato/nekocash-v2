import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.root}>
      <Link className={styles.item} to="/">Dashboard</Link>
      <Link className={styles.item} to="transactions">Histórico</Link>
    </header>
  );
}

export default Navbar;
