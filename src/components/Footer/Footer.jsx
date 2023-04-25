import React from 'react';
import styles from './Footer.module.css';
import Logo from './assets/Logo';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles['footer-contents']}>
      <div className={styles['footer-column']}>
        <div className={styles['logo']}>
          <Logo color='#555555' />
        </div>
        <div className={styles['footer']}>
          <div className={styles['footer-copyright']}>
            <p>Copyright © 2023 NekoApp Inc. Todos os direitos reservados.</p>
          </div>
          <div className={styles['social-icons']}>
            <p>Siga-nos</p>
            <ul className={styles['social-icons_list']}>
              <li className={styles['social-icons_item']}>
                <a href="https://www.facebook.com/joicemarina" target="_blank" rel="noopener noreferrer">
                  <FaFacebook color='#000' />
                </a>
              </li>
              <li className={styles['social-icons_item']}>
                <a href="https://twitter.com/marigrigolato" target="_blank" rel="noopener noreferrer">
                  <FaTwitter color='#000' />
                </a>
              </li>
              <li className={styles['social-icons_item']}>
                <a href="https://www.instagram.com/marigrigolato/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram color='#000' />
                </a>
              </li>
              <li className={styles['social-icons_item']}>
                <a href="https://www.linkedin.com/in/joice-grigolato/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin color='#000' />
                </a>
              </li>
              <li className={styles['social-icons_item']}>
                <a href="https://github.com/marigrigolato" target="_blank" rel="noopener noreferrer">
                  <FaGithub color='#000' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
