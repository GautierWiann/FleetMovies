import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header'
import CategorySeries from './CategorySeries'
import Cat from './CategoryMovies';
import 'antd/dist/antd.css';
import styles from '../styles/Perso.module.css';

function UserSpace() {
    const [seriesWatchList, setSeriesWatchList] = useState([])
    
    const seriesWatched = useSelector((state) => state.seriesWatched.value);


    useEffect (  () => {

       
        const details = []
        async function loadDetails () {
        for (let i=0 ; i<seriesWatched.length ; i ++) {
        const rawDetails = await fetch(
            `https://api.themoviedb.org/3/tv/${seriesWatched[i].id}?api_key=d10984763f2efdaf65b18c9ffabf8b5f&language=fr-fr`
          );
    
        const detailsData = await rawDetails.json();
        details.push(detailsData)
        }}

        loadDetails().then (() => {
            const seriesWatchMap = seriesWatched.map (  (serie, i) => {
        
        
                return (
                    <div className={styles.SerieWatchContainer}>
                    <img
            className={styles.posterSeriesWatch}
            src={serie.poster}
            alt={serie.title}
          />
          <div className={styles.textContainer}>
          <p className={styles.name}>{serie.title}</p>
          <p className={styles.description}>{serie.overview} </p>
           { details[i].next_episode_to_air && <p className={styles.next}>Prochain épisode : épisode {details[i].next_episode_to_air.episode_number} saison {details[i].next_episode_to_air.season_number} le {details[i].next_episode_to_air.air_date}</p>}
           { !details[i].next_episode_to_air && <p className={styles.next}>Date de diffusion du prochain épisode inconnue</p>}
          </div>
          </div>
                )
            } )
            setSeriesWatchList(seriesWatchMap)
        } )
       
    }, [])
  return (
   
    <div className={styles.main}>
      <Header/>
      {seriesWatchList}
      <Cat name='Vos Films à regardé' link='watch' />  
      <CategorySeries   name="Séries likées" link="liked"/>
      <Cat name='Films likés' link='liked' />
       
      
    </div>
  );
}

export default UserSpace;