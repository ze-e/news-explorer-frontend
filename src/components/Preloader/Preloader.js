import React from 'react';
import nothingFoundImage from '../../images/not-found.png';
import loadingImage from '../../images/loading.png';


export default function Preloader(props) {

  return (
  <section className="preloader">
    {props.loading ? <img className="preloader__image" src={loadingImage} alt="loading..."></img> : <img src={nothingFoundImage} alt="nothing found"></img>}
    {!props.loading && <h2 className="preloader__title">Nothing found</h2>}
    {props.loading ? 
      <p className="preloader__text">Searching for news...</p>:
      <p className="preloader__text">Sorry, but nothing matched your search terms.</p>
    }
  </section>
  )
}