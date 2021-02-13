import React from 'react';


export default function NewsCard(props) {

  const [bookmarked, setBookmarked] = React.useState(false);

  function handleBookmark() {
    props.isSignedIn && setBookmarked(!bookmarked);
  }

  function handleCardClick() {
    window.location.href = `${props.link}`; 
  }

  return (
    <>
      <div className="newsCard__image" style={{backgroundImage:`url("${props.card.image}")`}} onClick={handleCardClick}>
        <button className="newsCard__keyword">{props.card.keyword}</button>
        <button className={`newsCard__button ${bookmarked && "newsCard__button_marked"}`} onClick={handleBookmark}></button>
        <button className={`newsCard__button-hover ${props.isSignedIn && "newsCard__button-hover_signedIn"}`} onClick={handleBookmark}>
          {`${!props.isSignedIn ? "Sign in to save articles":"Remove from saved"}`}
        </button>
      </div>
      <h4 className="newsCard__date">{props.card.date}</h4>
      <h3 className="newsCard__title">{props.card.title}</h3>
      <p className="newsCard__description">{props.card.description}</p>
      <p className="newsCard__source">{props.card.source}</p>
    </>
  );
}