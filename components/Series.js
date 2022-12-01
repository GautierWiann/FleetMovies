import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header'
import SeriesCategories from './SeriesCategories';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';
function Series() {
  const [searching, setSearching] = useState(false)
  
  



  return (
   
    <div className={styles.main}>
      <Header/>
      
        <SeriesCategories/>
      
    </div>
  );
}

export default Series;
