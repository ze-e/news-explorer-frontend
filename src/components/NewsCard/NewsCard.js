import React from 'react';

export default function NewsCard(props) {

  return (
    <>
      <div className="newsCard__image" style={{backgroundImage: `url(../images/sample_images/${props.card.image})`}}>
        <button className="newsCard__keyword">{props.card.keyword}</button>
        <button className="newsCard__button"></button>
      </div>
      <h4 className="newsCard__date">{props.card.date}</h4>
      <h3 className="newsCard__title">{props.card.title}</h3>
      <p className="newsCard__description">{props.card.description}</p>
      <p className="newsCard__source">{props.card.source}</p>
    </>
  );
}