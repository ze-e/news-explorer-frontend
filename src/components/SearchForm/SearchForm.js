import React from 'react';

export default function SearchForm(props) {
  return (
      <form className="search-form">
        <input className="search-field" type="search" placeholder="Nature"></input>
        <button className="search-button" type="button" onClick={props.onSearch}>Search</button>
      </form>
  ) 
}