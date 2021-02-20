import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';
import Loading from '../Preloader/Preloader';

import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function NewsCardList(props) {

  const savedCards = React.useContext(CurrentCardsContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cards = props.searchCards ? props.searchCards : savedCards ? savedCards : [];

  const [itemsToShow, setitemsToShow] = React.useState(3);
  const [showMoreButton, setshowMoreButton] = React.useState(true);

  function handleMoreButton(){
    if(itemsToShow + 3 < cards.length){
      setitemsToShow(itemsToShow + 3);
    }
    else if(itemsToShow < cards.length){
      setitemsToShow(cards.length);
    }
  }

  React.useEffect(()=>{
    if(cards.length === 0 || itemsToShow === cards.length){
      setshowMoreButton(false)
    }
    else if(cards.length > 3 && itemsToShow < cards.length){
      setshowMoreButton(true)
    }
  },[cards, itemsToShow])

  return (
    <div className="newsCardList">
    <h3 className="newsCardList__title">Search results</h3>
      <div className="newsCardList__container">
      {Array.isArray(cards) && cards.length > 0 ? 
        cards.slice(0, itemsToShow).map(card => (
          <div className="newsCard" key={card._id}>
            <NewsCard card={card} bookmarked={props.isSignedIn && savedCards.some((item) => item.link === card.link)} isSignedIn={props.isSignedIn} onSaveCard={props.onSaveCard} onOpenSignin={props.onOpenSignin} onDeleteCard={props.onDeleteCard}/>
          </div>
        ))
        :
        <Loading loading={props.loading} />
      }
      </div>
      {showMoreButton && <button className="newsCardList__show-more" onClick={handleMoreButton}>Show More</button>}
    </div>
  );
}