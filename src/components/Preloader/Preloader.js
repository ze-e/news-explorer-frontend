import React from 'react';
import loadingImage from '../../images/loading.png';

export default function Preloader() {
  return (
    <section className="preloader">
    <img src={loadingImage}></img>
    <p className="preloader__text">Searching for news...</p>
    </section>
  ) 
}