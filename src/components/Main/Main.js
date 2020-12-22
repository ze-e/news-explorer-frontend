import React from 'react';

export default function Main(props) {
  return (
    <section className="main">
      <h2 className="main__title">What's going on in the world?</h2>
      <h3 className="main__subtitle">
        Find the latest news on any topic 
        and save them in your personal account.
      </h3> 
      <form className="main__search-form">
        <input className="main__search-field" type="search" placeholder="Nature"></input>
        <button className="main__search-button" type="submit">Search</button>
      </form>
    </section>
  ) 
}