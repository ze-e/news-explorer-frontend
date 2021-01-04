import React from 'react';

export default function SearchForm() {
  return (
      <form className="search-form">
        <input className="search-field" type="search" placeholder="Nature"></input>
        <button className="search-button" type="submit">Search</button>
      </form>
  ) 
}