import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { SortField, SortOrder } from '../types/pokemon';
import styles from '../styles/ListView.module.css';

const ListView: React.FC = () => {
  const { loading, error, searchPokemon, sortPokemon } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedPokemon = useMemo(() => {
    const searched = searchPokemon(searchTerm);
    return sortPokemon(searched, sortField, sortOrder);
  }, [searchTerm, sortField, sortOrder, searchPokemon, sortPokemon]);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as SortField);
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.listView}>
      <div className={styles.header}>
        <h1>Pokémon List</h1>
      </div>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search Pokémon by name, ID, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        
        <div className={styles.sortControls}>
          <label className={styles.sortLabel}>Sort by</label>
          <select 
            value={sortField} 
            onChange={handleSortFieldChange}
            className={styles.sortSelect}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="height">Height</option>
            <option value="weight">Weight</option>
            <option value="base_experience">Base Experience</option>
          </select>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === 'asc'}
                onChange={() => handleSortOrderChange('asc')}
                className={styles.radioInput}
              />
              ascending
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === 'desc'}
                onChange={() => handleSortOrderChange('desc')}
                className={styles.radioInput}
              />
              descending
            </label>
          </div>
        </div>
      </div>

      <div className={styles.resultsCount}>
        Showing {filteredAndSortedPokemon.length} Pokémon
      </div>

      <div className={styles.pokemonGrid}>
        {filteredAndSortedPokemon.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className={styles.pokemonCard}
          >
            <div className={styles.pokemonImageContainer}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className={styles.pokemonImage}
                loading="lazy"
              />
            </div>
            <div className={styles.pokemonInfo}>
              <h3 className={styles.pokemonName}>
                #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
              </h3>
              <div className={styles.pokemonTypes}>
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${styles.typeTag} ${styles[type.type.name]}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className={styles.pokemonStats}>
                <span>Height: {(pokemon.height / 10).toFixed(1)}m</span>
                <span>Weight: {(pokemon.weight / 10).toFixed(1)}kg</span>
                <span>Base EXP: {pokemon.base_experience}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAndSortedPokemon.length === 0 && searchTerm && (
        <div className={styles.noResults}>
          <p>No Pokémon found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ListView;