import styles from './Footer.module.css';
import Logo from '../../Logo';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.contents}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.footer}>
          <div className={styles.copyright}>
            <p>Copyright © 2023 NekoApp Inc. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
