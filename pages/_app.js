import '../styles/globals.css';
import Head from 'next/head';



// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import moviesLiked from '../reducers/MoviesLiked';
import moviesWatched from '../reducers/MoviesWatch';
import seriesLiked from '../reducers/SeriesLiked';
import seriesWatched from '../reducers/SeriesWatch';
import stars from '../reducers/Stars';


//Comme il s'agissait d'un test frontend, j'ai décidé de faire passer les informations de l'utilisateur en store persistant redux

const reducers = combineReducers({ moviesLiked, moviesWatched, seriesLiked, seriesWatched, stars });
const persistConfig = { key: 'fleetMovie', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});


const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </PersistGate>
    </Provider>
  );
}

export default App;
