import { useState, useEffect } from "react";
import styles from "../styles/Season.module.css";
import Episode from "./Episode";

function Season(props) {
  const [details, setDetails] = useState({});
  const [episodes, setEpisodes] = useState([]);
 


  //load details


  useEffect(() => {
    async function loadSeason() {
      const rawDetails = await fetch(
        `https://api.themoviedb.org/3/tv/${props.id}/season/${props.season}?api_key=d10984763f2efdaf65b18c9ffabf8b5f&language=fr-fr`
      );

      const detailsData = await rawDetails.json();
      console.log("🚀 ~ file: Season.js:24 ~ loadSeason ~ detailsData", detailsData)
      const episodesMap = detailsData.episodes.map( episode => {
        return <Episode poster={episode.still_path} number={episode.episode_number} name={episode.name} overview={episode.overview} />
      })
      setDetails(detailsData);
      setEpisodes(episodesMap)
    }
    
    
    loadSeason();
  }, [props.season]);

  

  return (
    <div>
    <div className={styles.descriptionContainer}>       
        <img className={styles.poster} src={`https://image.tmdb.org/t/p/w1280/${details.poster_path}`}/>
           <div className={styles.textContainer}>
           {details.air_date &&  <p className={styles.details}><span style={{color:'whitesmoke'}}>Date du début de la diffusion :</span> {details.air_date}</p>}
                {details.episodes&&  <p className={styles.details}>{details.episodes.length} épisodes</p>}
                {details.overview &&  <p className={styles.description}>{details.overview}</p>}
     </div>
     </div>  
     {episodes}
     </div>       
  );
}

export default Season;
