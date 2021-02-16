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
  const [itemsToShow, setitemsToShow] = React.useState(3);
  const [showMoreButton, setshowMoreButton] = React.useState(true);

  function handleLoading(){
    setLoading(false);
  }

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
    else(cards.length > 0 && itemsToShow < cards.length){
      setshowMoreButton(true)
    }
  },[itemsToShow])

  return (
    <div className="newsCardList">
    <h3 className="newsCardList__title">Search results</h3>
      <div className="newsCardList__container">
      {Array.isArray(cards) && cards.length > 0 ? 
        cards.slice(0, itemsToShow).map(card => (
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
      {showMoreButton && <button className="newsCardList__show-more">Show More</button>}
    </div>
  );
}