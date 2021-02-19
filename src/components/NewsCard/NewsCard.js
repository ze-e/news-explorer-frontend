import React from 'react';

export default function NewsCard(props) {

  function handleClick() {
    if(props.isSignedIn && props.onSaveCard) {
      props.onSaveCard(props.card);
    }

    else if(props.isSignedIn && props.onDeleteCard) {
      props.onDeleteCard(props.card);
    }
    else if(!props.isSignedIn){
      props.onOpenSignin && props.onOpenSignin();
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
        <button className={`newsCard__button ${props.bookmarked && "newsCard__button_marked"}`} onClick={handleClick}></button>
        <button className={`newsCard__button-hover ${props.isSignedIn && "newsCard__button-hover_signedIn"}`}>
          {`${!props.isSignedIn ? "Sign in to save articles":"Remove from saved"}`}
        </button>
      </div>
      <div onClick={handleCardClick}>
        <h4 className="newsCard__date">{formatDate(props.card.date)}</h4>
        <h3 className="newsCard__title">{props.card.title}</h3>
        <p className="newsCard__description">{props.card.text}</p>
        <p className="newsCard__source">{props.card.name}</p>
      </div>
    </>
  );
}