import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to PokéDex</h1>
        <p className={styles.subtitle}>
          Explore the world of Pokémon! Search, discover, and learn about your favorite Pokémon.
        </p>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>📋 List View</h3>
            <p>Search and sort through all Pokémon with detailed filtering options.</p>
            <Link to="/list" className={styles.button}>
              Explore List
            </Link>
          </div>
          <div className={styles.featureCard}>
            <h3>🖼️ Gallery View</h3>
            <p>Browse beautiful Pokémon artwork and filter by types.</p>
            <Link to="/gallery" className={styles.button}>
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;