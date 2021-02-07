import React from 'react';

export default function SavedNewsHeader(props) {
  return (
    <section className="SavedNewsHeader">
      <p className="SavedNewsHeader__caption">Saved articles</p>
      <h2 className="SavedNewsHeader__title">myName, you have 0 saved articles</h2>
      <h3 className="SavedNewsHeader__keywords-title">By Keywords: 
        <span className="SavedNewsHeader__keywords-list"> Keyword1, Keyword2, Keyword3, and 0 others</span>
      </h3>
    </section>
  ) 
}