import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import styles from '../styles/GalleryView.module.css';

const GalleryView: React.FC = () => {
  const { pokemonList, loading, error, types, filterByType } = usePokemon();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredPokemon = useMemo(() => {
    return filterByType(pokemonList, selectedTypes);
  }, [pokemonList, selectedTypes, filterByType]);

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) {
        return prev.filter(t => t !== typeName);
      } else {
        return [...prev, typeName];
      }
    });
  };

  const clearFilters = () => {
    setSelectedTypes([]);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Pokémon Gallery...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.galleryView}>
      <div className={styles.header}>
        <h1>Pokémon Gallery</h1>
        <p>Browse beautiful Pokémon artwork and filter by types</p>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h3>Filter by Type:</h3>
          {selectedTypes.length > 0 && (
            <button onClick={clearFilters} className={styles.clearButton}>
              Clear All Filters
            </button>
          )}
        </div>
        
        <div className={styles.typeFilters}>
          {types.slice(0, 18).map((typeName) => (
            <button
              key={typeName}
              onClick={() => handleTypeToggle(typeName)}
              className={`${styles.typeFilter} ${styles[typeName]} ${
                selectedTypes.includes(typeName) ? styles.active : ''
              }`}
            >
              {typeName}
            </button>
          ))}
        </div>
        
        {selectedTypes.length > 0 && (
          <div className={styles.activeFilters}>
            <span>Active filters: </span>
            {selectedTypes.map(type => (
              <span key={type} className={`${styles.activeFilterTag} ${styles[type]}`}>
                {type}
                <button 
                  onClick={() => handleTypeToggle(type)}
                  className={styles.removeFilter}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.resultsCount}>
        Showing {filteredPokemon.length} Pokémon
        {selectedTypes.length > 0 && ` with type${selectedTypes.length > 1 ? 's' : ''}: ${selectedTypes.join(', ')}`}
      </div>

      <div className={styles.gallery}>
        {filteredPokemon.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className={styles.galleryItem}
          >
            <div className={styles.imageContainer}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className={styles.pokemonImage}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <h4 className={styles.pokemonName}>
                  #{pokemon.id.toString().padStart(3, '0')}
                </h4>
                <h3>{pokemon.name}</h3>
                <div className={styles.types}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`${styles.typeTag} ${styles[type.type.name]}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPokemon.length === 0 && selectedTypes.length > 0 && (
        <div className={styles.noResults}>
          <p>No Pokémon found with the selected type(s)</p>
          <p>Try selecting different types or clear filters to see all Pokémon</p>
        </div>
      )}
    </div>
  );
};

export default GalleryView;