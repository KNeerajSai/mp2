import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/">PokéDex</Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/list" className={isActive('/list')}>
              List View
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={isActive('/gallery')}>
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;