import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Serie.module.css";
import { Modal, Tag } from "antd";
import "antd/dist/antd.css";


import { useDispatch, useSelector } from "react-redux";
import { addWatchSerie, removeWatchSerie } from "../reducers/SeriesWatch";
import { addLikeSerie, removeLikeSerie } from "../reducers/SeriesLiked";
import { vote} from '../reducers/Stars';

import Season from "./Season";

function Serie(props) {
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [personalNote, setPersonalNote] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [creators, setCreators] = useState([]);
  const [seasonsButton, setSeasonsButton] = useState([]);
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
      dispatch(removeWatchSerie(props));
    } else {
      dispatch(addWatchSerie(props));
    }
  };
  let videoIconStyle = { cursor: "pointer" };
  if (props.isWatched) {
    videoIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Like movie
  const handleLikeMovie = () => {
    if (props.isLiked) {
      dispatch(removeLikeSerie(props));
    } else {
      dispatch(addLikeSerie(props));
    }
  };

  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
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

  //load details

  useEffect(() => {
    async function loadserie() {
      const rawDetails = await fetch(
        `https://api.themoviedb.org/3/tv/${props.id}?api_key=d10984763f2efdaf65b18c9ffabf8b5f&language=fr-fr`
      );

      const detailsData = await rawDetails.json();
      console.log("🚀 ~ file: Serie.js:74 ~ loadserie ~ details", detailsData);

      const creatorsData = detailsData.created_by.map((creator) => {
        return (
          <p>
            <span className={styles.character}> {creator.name}</span>
            <p />
          </p>
        );
      });
      const seasons = [];
      for (let i = 0; i < detailsData.number_of_seasons; i++) {
        seasons.push(
          <button
            className={styles.seasonButton}
            onClick={() => setSeasonNumber(i + 1)}
          >
            Season {i + 1}
          </button>
        );
      }
      setDetails(detailsData);
      setCreators(creatorsData);
      setSeasonsButton(seasons);
    }

    loadserie()
    for (const el of starsArray){
      if (starsArray.find(movie => movie.title == props.title)) {
        setPersonalNote(el.stars)
      }};
  }, []);
  const genresBadges = props.genres.map((genre) => {
    return <Tag color="#f1c40f">{genre}</Tag>;
  });

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={props.poster}
        alt={props.title}
        onClick={() => showModal()}
      />
      <Modal
        open={isModalOpen}
        visible={isModalOpen}
        footer={null}
        width={"70%"}
        style={{ marginBottom: "10%" }}
        bodyStyle={{ backgroundColor: "#6c757d" }}
      >
        <div className={styles.modalMovie}>
          <div className={styles.modalImage}>
            <img
              className={styles.banner}
              src={props.poster}
              alt={props.title}
            />
          </div>
          <div className={styles.textContainer}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={handleCancel}
                  style={{
                    width: "150px",
                    marginBottom: "4%",
                    borderColor: "#f1c40f",
                  }}
                >
                  Retour
                </button>
                <span style={{ fontSize: "18px" }}>
                  {personalStars} ({personalNote})
                </span>

                <span>
                  note de {props.voteAverage}/10
                  <span style={{ margin: "10px" }}>
                    <FontAwesomeIcon
                      icon={faVideo}
                      onClick={() => handleWatchMovie()}
                      style={videoIconStyle}
                      className="watch"
                    />{" "}
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => handleLikeMovie()}
                      style={heartIconStyle}
                      className="like"
                    />
                  </span>
                </span>
              </div>
              <div className={styles.name}>{props.title}</div>
              <div>{genresBadges}</div>
              <p className={styles.credits}>
                Créé par :<span style={{ marginLeft: "2%" }}>{creators}</span>
              </p>
              {props.overview && (
                <p className={styles.description}>{props.overview}</p>
              )}
              {details.last_episode_to_air && (
                <p className={styles.credits}>
                  {" "}
                  Dernier épisode diffusé:{" "}
                  <span style={{ color: "whitesmoke", marginLeft: "2%" }}>
                    épisode {details.last_episode_to_air.episode_number} saison{" "}
                    {details.last_episode_to_air.season_number} le{" "}
                    {details.last_air_date}
                  </span>
                </p>
              )}
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.seasonButtonContainer}>
                {seasonsButton}
              </div>
            </div>
            <Season id={details.id} season={seasonNumber} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Serie;
