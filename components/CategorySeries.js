import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HorizontalScroll from 'react-scroll-horizontal'
import Serie from "./Serie";
import styles from "../styles/CategorySerie.module.css";

function Cat(props) {
  const [seriesData, setSeriesData] = useState([]);

  const seriesLike = useSelector((state) => state.seriesLiked.value);
  const seriesWatch = useSelector((state) => state.seriesWatched.value);
  // Movies list

  useEffect(() => {
    async function loadmovie() {
      if (props.link !== "liked") {
        const rawResponse = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=d10984763f2efdaf65b18c9ffabf8b5f&with_original_language=en&language=fr-fr&page=1,2&${props.link}`
        );
        const response = await rawResponse.json();
       
        const formatedData = response.results.map((serie) => {
          const genres = [];
          for (const genre of serie.genre_ids) {
           
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
          const poster = `https://image.tmdb.org/t/p/w1280/${serie.poster_path}`;

          return {
            title: serie.original_name,
            poster,
            voteAverage: serie.vote_average,
            voteCount: serie.vote_count,
            overview: serie.overview,
            id: serie.id,
            genres,
          };
        });
        setSeriesData(formatedData);
      } else if (props.link === "liked") {
        setSeriesData(seriesLike);
      }
    }
    loadmovie();
  }, []);

  const series = seriesData.map((data, i) => {
    const isWatched = seriesWatch.some((serie) => serie.title === data.title);
    console.log("🚀 ~ file: CategorySeries.js:79 ~ series ~ isWatched", isWatched)
    const isLiked = seriesLike.some((serie) => serie.title === data.title);
    console.log("🚀 ~ file: CategorySeries.js:81 ~ series ~ isLiked", isLiked)
    return (
      <Serie
        key={i}
        isLiked={isLiked}
        isWatched={isWatched}
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
  if (seriesData.length > 4){
  return (
    <div>
      <div className={styles.title}>{props.name}</div>
      <div className={styles.seriesContainer}>
        <HorizontalScroll>{series}</HorizontalScroll>
      </div>
    </div>
  );}

  else {
      
  return (
    <div>
      <div className={styles.title}>{props.name}</div>
      <div className={styles.seriesContainer}>
        {series}  
      </div>
    </div>
  );
    
  }
}

export default Cat;
