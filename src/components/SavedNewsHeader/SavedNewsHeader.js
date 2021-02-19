import React from 'react';
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function SavedNewsHeader(props) {

  const cards = React.useContext(CurrentCardsContext);
  const keywords = commonKeyword(cards.map(card => card.keyword));
  
  function commonKeyword(keywords){ 
    return keywords.sort((a,b) =>
      keywords.filter(keyword => keyword===a).length
      - keywords.filter(keyword => keyword===b).length
    ).filter((v, i, a) => a.indexOf(v) === i).reverse();
  }

  return (
    <section className="SavedNewsHeader">
      <p className="SavedNewsHeader__caption">Saved articles</p>
      <h2 className="SavedNewsHeader__title">myName, you have {cards.length} saved articles</h2>
      <h3 className="SavedNewsHeader__keywords-title">{keywords.length > 0 && "By Keywords: "} 
        <span className="SavedNewsHeader__keywords-list"> 
          {keywords[0] && `${keywords[0]}`} 
          {keywords[1] && `, ${keywords[1]}`} 
          {keywords.length > 3  ? ` and ${keywords.length-2} others` : 
          keywords[2] && `, ${keywords[2]}`}
        </span>
      </h3>
    </section>
  ) 
}