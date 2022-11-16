import React, { useEffect, useState } from 'react';
import './App.css';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( () => {
    const loadAll = async () => {
      // pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o filme de destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo);
    }

    loadAll();

  }, [])

  useEffect( () => {
    const scrollListener = () => {
      if(window.scrollY > 100) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className='lists'>
        {movieList.map( (item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>
          Criado seguindo as aulas do Bonieky Lacerda
        </p>
        <p>
          Direitos de imagem para Netflix
        </p>
        <p>
          Todas as informações foram retiradas do site Themoviedb.org
        </p>
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
        </div>
      }

    </div>
  );
}


// e6b63d915ca247efb2c6442b5525ac05 key