import styles from "../styles/Episode.module.css";


function Episode(props) {
  
  

  return (
    <div className={styles.descriptionContainer}>       
        <img className={styles.poster} src={`https://image.tmdb.org/t/p/w1280/${props.poster}`}/>
           <div className={styles.textContainer}>
           {props.number &&  <span className={styles.number}>Episode {props.number}</span>}
                {props.name&&  <span className={styles.name}>{props.name}</span>}
                {props.overview &&  <span className={styles.description}>{props.overview}</span>}
     </div>
     </div>         
  );
}

export default Episode;
