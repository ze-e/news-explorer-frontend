import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';

//cards
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function NewsCardList(props) {

  const savedCards = React.useContext(CurrentCardsContext);
  const cards = props.cards ? props.cards : savedCards;
  const keywords = commonKeyword(cards.map(card => card.keyword));
  
  function commonKeyword(keywords){ 
    return keywords.sort((a,b) =>
      keywords.filter(keyword => keyword===a).length
      - keywords.filter(keyword => keyword===b).length
    );
  }

  const [loading, setLoading] = React.useState(false);

  function handleLoading(){
    setLoading(false);
  }

  return (
    <CurrentCardsContext.Provider value={cards}>
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
    </CurrentCardsContext.Provider>
  );
}