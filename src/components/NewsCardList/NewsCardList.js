import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';

//cards
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function NewsCardList(props) {

  const savedCards = React.useContext(CurrentCardsContext);
  const cards = props.cards ? props.cards : savedCards;

  const [loading, setLoading] = React.useState(false);

  function handleLoading(){
    setLoading(false);
  }

  return (
    <div className="newsCardList">
    <h3 className="newsCardList__title">Search results</h3>
      <div className="newsCardList__container">
      {Array.isArray(cards) && cards.length > 0 ? 
        cards.map(card => (
          <div className="newsCard" key={card._id}>
            <CurrentCardsContext.Provider value={savedCards}>
            <NewsCard card={card} isSignedIn={props.isSignedIn} onSaveCard={props.onSaveCard} onDeleteCard={props.onDeleteCard}/>
            </CurrentCardsContext.Provider>

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