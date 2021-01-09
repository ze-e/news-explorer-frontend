import React from 'react';
import loadingImage from '../../images/loading.png';
import nothingFoundImage from '../../images/not-found.png';

export default function Preloader(props) {

  return (
  <section className="preloader">
    props.loading ?
    (
    <img src={loadingImage}></img>
    <p className="preloader__text">Searching for news...</p>)
    :
    (<img src={nothingFoundImage}></img>
    <h2 className="preloader__title">Nothing found</h2>
    <p className="preloader__text">Sorry, but nothing matched your search terms.</p>)
  </section>
  )
}