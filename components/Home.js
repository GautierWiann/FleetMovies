import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Header from './Header'
import MoviesCat from './MoviesCategories';
import Search from './Search'
import Cat from './CategoryMovies';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';


function Home() {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false)
  


  const onSearch = (e) => {
    setSearching(true)
    setSearch(e.target.value)
  };

  const stopSeach = () => {
    setSearching(false)
    setSearch("")
  };

 if (searching) {
  return (
    <div className={styles.main}>
    <Header/>
    
    <div className={styles.searchContainer}>
    <FontAwesomeIcon className={styles.searchIcon} onClick={stopSeach} icon={faArrowLeft} /><input className={styles.search}   onChange={e => {setSearch(e.target.value)}} value={search}  style={{ width: "30%" }} />
 </div> 
    
     <Search search={search} />
  </div>)
 } else {
  return (
   
    <div className={styles.main}>
      <Header/>
      
      <div className={styles.searchContainer}>
      <input className={styles.search}   onChange={e => {onSearch(e)}} value={search}  style={{ width: "30%" }} />
      
   </div> 
      
        <MoviesCat/>
      <Cat name='Films likés' link='liked' />
       
      
    </div>
  );
}}

export default Home;
