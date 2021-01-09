import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';
import cardList from '../../config/testcards.json';
import nothingFoundImage from '../../images/not-found.png';

export default function NewsCardList() {
  const cards = cardList;
  const [loading, setLoading] = React.useState(false);

  function handleLoading(props){
    setLoading(false);
  }

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
        <Loading loading={true} handleLoading={handleLoading} />
      }
      </div>
      <button className="newsCardList__show-more">Show More</button>
    </div>
  );
}