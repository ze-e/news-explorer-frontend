import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';

//cards
import cardList from '../../config/testcards.json';
import blankCardList from '../../config/testcards_blank.json';

export default function NewsCardList(props) {

  const cards = props.cards;

  const [loading, setLoading] = React.useState(false);

  function handleLoading(props){
    setLoading(false);
  }

  return (
    <div className="newsCardList">
    <h3 className="newsCardList__title">Search results</h3>
      <div className="newsCardList__container">
      {cards.length > 0 ? 
        cards.map(card => (
          <div className="newsCard" key={card._id}>
            <NewsCard card={card} isSignedIn={props.isSignedIn}/>
          </div>
        ))
        :
        <Loading loading={false} handleLoading={handleLoading} />
      }
      </div>
      {cards.length > 0 && <button className="newsCardList__show-more">Show More</button>}
    </div>
  );
}