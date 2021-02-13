import React from 'react';

export default function SearchForm(props) {

  const [setsearchValue, searchValue] = React.useState('');
  const [setsearchError, searchError] = React.useState('');
  const [setformInvalid, formInvalid] = React.useState(true);

  function handleInput(e) {
    //set value
    setsearchValue(e.target.value);
    //set error
    props.formvalidator(e.target, setsearchError);
  }

  function handleSearch(e){
    e.preventDefault();     
    //check if the form is valid before sending
    // if(!formInvalid){
      props.onSearch(searchValue);
    // }
  }

const searchRef = React.useRef();

function validateForm(){
  props.formValidator(searchRef.current,'.search-field') ? setformInvalid(true) : setformInvalid(false);
}

  return (
      <form className="search-form" ref={searchRef}>
        <input className="search-field" type="text" placeholder="Nature"/>
        <span className="search-error" id="search-error" minLength="1" >{searchError}</span>
        <button className="search-button" type="button" onClick={handleSearch}>Search</button>
      </form>
  ) 
}