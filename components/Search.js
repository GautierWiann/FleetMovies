import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Movie from "./Movie";
import styles from "../styles/Search.module.css";

function Search(props) {
  const [movies, setMovies] = useState([]);

  const moviesLike = useSelector((state) => state.moviesLiked.value);

  // Movies list
  useEffect(() => {
    async function loadmovie() {
      const rawResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d10984763f2efdaf65b18c9ffabf8b5f&language=fr-fr&query=${props.search}&page=1&include_adult=false`
      );
      const response = await rawResponse.json();
      const formatedData = response.results.map((movie) => {
        const genres = [];
        for (const genre of movie.genre_ids) {
          if (genre === 28) {
            genres.push("Action");
          } else if (genre === 12) {
            genres.push("Aventure");
          } else if (genre === 16) {
            genres.push("Animation");
          } else if (genre === 35) {
            genres.push("Comédie");
          } else if (genre === 80) {
            genres.push("Crime");
          } else if (genre === 99) {
            genres.push("Documentaire");
          } else if (genre === 18) {
            genres.push("Drame");
          } else if (genre === 10751) {
            genres.push("Famillial");
          } else if (genre === 14) {
            genres.push("Fantastique");
          } else if (genre === 36) {
            genres.push("Historique");
          } else if (genre === 27) {
            genres.push("Horreur");
          } else if (genre === 10402) {
            genres.push("Musical");
          } else if (genre === 10749) {
            genres.push("Romance");
          } else if (genre === 878) {
            genres.push("Science-Fiction");
          }
        }
        const poster = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;

        return {
          title: movie.title,
          poster,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          overview: movie.overview,
          id: movie.id,
          genres,
        };
      });

      const moviesMap = formatedData.map((data, i) => {
        const isLiked = moviesLike.some((movie) => movie.title === data.title);
        return (
          <Movie
            key={i}
            isLiked={isLiked}
            title={data.title}
            overview={data.overview}
            poster={data.poster}
            voteAverage={data.voteAverage}
            voteCount={data.voteCount}
            id={data.id}
            genres={data.genres}
          />
        );
      });

      setMovies(moviesMap);
    }
    loadmovie();
  }, [props.search]);

  return (
    <div>
      <div className={styles.title}>Les resultats de votre recherche</div>
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Search;
