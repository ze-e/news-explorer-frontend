import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';
import cardList from '../../config/testcards.json';
import nothingFoundImage from '../../images/not-found.png';

export default function NewsCardList() {
  const cards = cardList;

  return (
    <div className="newsCardList">
      <div className="newsCardList__container">
      {cards.length > 0 ? 
        cards.map(card => (
          <div className="newsCard" key={card._id}>
            <NewsCard card={card}/>
          </div>
        ))
        :
        <section className="preloader">
        <img src={nothingFoundImage}></img>
        <h2 className="preloader__title">Nothing found</h2>
        <p className="preloader__text">Sorry, but nothing matched your search terms.</p>
        </section>
      }
      </div>
      <button className="newsCardList__show-more">Show More</button>
    </div>
  );
}