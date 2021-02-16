import React from 'react';
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function NewsCard(props) {

const [bookmarked, setBookmarked] = React.useState(false);
const savedCards = React.useContext(CurrentCardsContext);

React.useEffect(()=>{
  if(savedCards){
    const savedCard = savedCards.find((card) => card.link === props.card.link);
    if(savedCard){
      setBookmarked(true);
    }
    else{
      setBookmarked(false);
    }
  }
},[savedCards])

  function handleClick() {
    if(props.onSaveCard && props.isSignedIn) {
      props.onSaveCard(props.card);
    }

    else if(props.onDeleteCard && props.isSignedIn) {
      props.onDeleteCard(props.card);
    }
  }

  function handleCardClick() {
    window.location.href = `${props.card.link}`; 
  }

  function formatDate(date){
    const formatedDate = new Date(date);
    return new Intl.DateTimeFormat('en-US', {month:'long', day:'numeric', year:'numeric'}).format(formatedDate);
  }

  return (
    <>
      <div className="newsCard__image" style={{backgroundImage:`url("${props.card.image}")`}} >
        <button className="newsCard__keyword">{props.card.keyword}</button>
        <button className={`newsCard__button ${bookmarked && "newsCard__button_marked"}`} onClick={handleClick}></button>
        <button className={`newsCard__button-hover ${props.isSignedIn && "newsCard__button-hover_signedIn"}`}>
          {`${!props.isSignedIn ? "Sign in to save articles":"Remove from saved"}`}
        </button>
      </div>
      <h4 className="newsCard__date">{formatDate(props.card.date)}</h4>
      <h3 className="newsCard__title" onClick={handleCardClick}>{props.card.title}</h3>
      <p className="newsCard__description">{props.card.text}</p>
      <p className="newsCard__source">{props.card.name}</p>
    </>
  );
}