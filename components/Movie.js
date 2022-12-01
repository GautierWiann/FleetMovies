import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Movie.module.css';
import {  Modal, Tag } from 'antd';


import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../reducers/MoviesLiked';
import { addWatched, removeWatched} from '../reducers/MoviesWatch';
import { vote} from '../reducers/Stars';

function Movie(props) {
  const [personalNote, setPersonalNote] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credits, setCredits] = useState({});
  
  const dispatch = useDispatch();
  
  const starsArray = useSelector((state) => state.stars.value);
 

  const showModal = () => {
    setIsModalOpen(true);
  };

  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

 

  // Watch movie
  const handleWatchMovie = () => {
    if (props.isWatched) {
      dispatch(removeWatched(props));
    } else {
      dispatch(addWatched(props));
  }
  };
  let videoIconStyle = { 'cursor': 'pointer' };
  if (props.isWatched) {
    videoIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Like movie
  const handleLikeMovie = () => {
    
    if (props.isLiked) { 
      dispatch(removeLike(props))
    }
    else {
      dispatch(addLike(props))
    }
  };


  let heartIconStyle = { 'cursor': 'pointer' };
  if (props.isLiked) {
    heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < personalNote) {
      style = { 'color': '#f1c40f', 'cursor': 'pointer' };
    }
    personalStars.push(<FontAwesomeIcon key={i} icon={faStar} onClick={() => voting({title : props.title, stars : i + 1})} style={style} className="note" />);
  }

  function voting(e) {
    dispatch(vote(e))
    setPersonalNote(e.stars)
  }

  //load credits 

  useEffect(() => {
    async function loadmovie() {
    const rawCredits = await fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=d10984763f2efdaf65b18c9ffabf8b5f&language=fr-fr`)
    const credit = await rawCredits.json()
    setCredits(credit.cast)
  }

    loadmovie()
    for (const el of starsArray){
      if (starsArray.find(movie => movie.title == props.title)) {
        setPersonalNote(el.stars)
      }}
  }, []);
  
  const genresBadges = props.genres.map(genre => {
    return <Tag color="#f1c40f">{genre}</Tag>
  })

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.title} onClick={()=> showModal()} />
      <Modal open={isModalOpen}  footer={null}  width={'70%'} style={{marginBottom:'10%'}}   bodyStyle={{backgroundColor: '#6c757d'}} >
        <div className={styles.modalMovie}>
          <div className={styles.modalImage}>
      <img className={styles.banner} src={props.poster} alt={props.title} onClick={()=> showModal()} />
      </div>
      <div className={styles.textContainer}>
        <div>
          <div style={{display : 'flex', justifyContent:'space-between'}}>
          <span className={styles.name}>{props.title}</span> 
          <span>note de {props.voteAverage}/10 
           <span style={{margin:'10px'}}><FontAwesomeIcon icon={faVideo} onClick={() => handleWatchMovie()} style={videoIconStyle} className="watch" /> </span>
          <span><FontAwesomeIcon icon={faHeart} onClick={() => handleLikeMovie()} style={heartIconStyle} className="like" /></span>
        </span>
        </div>
        <div>{genresBadges}</div>
        {(credits[0] && credits[1] && credits[2]) && <p className={styles.credits}>Avec :  
        <span style={{marginLeft:'2%', color : 'white'}}>
        <span > {credits[0].name} dans le rôle de 
        <span className={styles.character}> {credits[0].character}</span>
        </span>
        <p/>
        <p>  {credits[1].name} dans le rôle de 
        <span className={styles.character}> {credits[1].character}</span>  </p>
        <p>  {credits[2].name} dans le rôle de 
        <span className={styles.character}> {credits[2].character}</span>  </p>
        </span>
        </p> }
          {props.overview && <p className={styles.description}>{props.overview}</p>}
        </div>
        <div className={styles.iconContainer}>
          
          <span>{personalStars} ({personalNote})</span>
          </div>
          <button onClick={handleCancel} style={{width:'150px', marginBottom:'4%', borderColor: '#f1c40f'}}>Retour</button>
      </div>
      
      </div>
      </Modal>
    </div>
  );
}

export default Movie;
