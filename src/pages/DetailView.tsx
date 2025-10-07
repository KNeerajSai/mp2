import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pokemon, PokemonSpecies } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import { usePokemon } from '../hooks/usePokemon';
import styles from '../styles/DetailView.module.css';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemonList } = usePokemon();
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = pokemonList.findIndex(p => p.id === parseInt(id || '0'));
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < pokemonList.length - 1;

  useEffect(() => {
    if (id) {
      loadPokemonDetail(id);
    }
  }, [id]);

  const loadPokemonDetail = async (pokemonId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const [pokemonData, speciesData] = await Promise.all([
        pokemonApi.getPokemon(pokemonId),
        pokemonApi.getPokemonSpecies(pokemonId)
      ]);
      
      setPokemon(pokemonData);
      setSpecies(speciesData);
    } catch (err) {
      setError('Failed to load Pokémon details');
      console.error('Error loading Pokemon detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      const previousPokemon = pokemonList[currentIndex - 1];
      navigate(`/pokemon/${previousPokemon.id}`);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextPokemon = pokemonList[currentIndex + 1];
      navigate(`/pokemon/${nextPokemon.id}`);
    }
  };

  const getFlavorText = (): string => {
    if (!species) return '';
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
  };

  const getStatPercentage = (statValue: number): number => {
    return Math.min((statValue / 255) * 100, 100);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Pokémon details...</p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className={styles.error}>
        <p>Error: {error || 'Pokémon not found'}</p>
        <Link to="/list" className={styles.backButton}>
          ← Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailView}>
      <div className={styles.navigation}>
        <button 
          onClick={handlePrevious} 
          disabled={!canGoPrevious}
          className={styles.navButton}
          title="Previous Pokémon"
        >
          ← Previous
        </button>
        
        <Link to="/list" className={styles.backToList}>
          Back to List
        </Link>
        
        <button 
          onClick={handleNext} 
          disabled={!canGoNext}
          className={styles.navButton}
          title="Next Pokémon"
        >
          Next →
        </button>
      </div>

      <div className={styles.pokemonDetail}>
        <div className={styles.pokemonHeader}>
          <div className={styles.imageSection}>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className={styles.mainImage}
            />
            <div className={styles.spriteGallery}>
              <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
              {pokemon.sprites.front_shiny && (
                <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h1 className={styles.pokemonName}>
              #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
            </h1>
            
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

            {species && (
              <p className={styles.description}>
                {getFlavorText()}
              </p>
            )}

            <div className={styles.physicalStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Height:</span>
                <span className={styles.statValue}>{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Weight:</span>
                <span className={styles.statValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Base Experience:</span>
                <span className={styles.statValue}>{pokemon.base_experience}</span>
              </div>
              {species && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Generation:</span>
                  <span className={styles.statValue}>{species.generation.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.detailedStats}>
          <div className={styles.statsSection}>
            <h3>Base Stats</h3>
            <div className={styles.statsList}>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className={styles.statRow}>
                  <span className={styles.statName}>
                    {stat.stat.name.replace('-', ' ')}:
                  </span>
                  <span className={styles.statNumber}>{stat.base_stat}</span>
                  <div className={styles.statBar}>
                    <div 
                      className={styles.statFill}
                      style={{ width: `${getStatPercentage(stat.base_stat)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.abilitiesSection}>
            <h3>Abilities</h3>
            <div className={styles.abilitiesList}>
              {pokemon.abilities.map((ability, index) => (
                <span 
                  key={index} 
                  className={`${styles.abilityTag} ${ability.is_hidden ? styles.hiddenAbility : ''}`}
                >
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden && ' (Hidden)'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;