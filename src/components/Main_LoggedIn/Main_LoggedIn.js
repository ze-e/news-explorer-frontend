import React from 'react';

export default function Main(props) {
  return (
    <section className="mainLoggedIn">
      <p className="mainLoggedIn__caption">Saved articles</p>
      <h2 className="mainLoggedIn__title">myName, you have 0 saved articles</h2>
      <h3 className="mainLoggedIn__keywords-title">By Keywords: 
        <span className="mainLoggedIn__keywords-list">
          Keyword1, Keyword2, Keyword3, and 0 others
        </span>
      </h3>
    </section>
  ) 
}