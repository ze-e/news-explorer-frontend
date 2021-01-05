import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';
import cardList from '../../config/testcards.json';

export default function NewsCardList() {
  const cards = cardList;

  return (
    <div className="newsCardList">
    {cards.length > 0 ?
     cards.map(card => (
      <div className="newsCard" key={card._id}>
        <NewsCard card={card}/>
      </div>
    ))
    
    :
    //show loading screen if cards haven't loaded
    <Loading />
    }
    </div>
  );
}