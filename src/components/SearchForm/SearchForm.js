import React from 'react';

export default function SearchForm(props) {

  const [searchValue, setsearchValue] = React.useState('');
  const [searchError, setsearchError] = React.useState('');
  const [formInvalid, setformInvalid] = React.useState(true);

  function handleInput(e) {
    //set value
    setsearchValue(e.target.value);
    //set error
    props.fieldValidator(e.target, setsearchError);
  }

  function handleSearch(){
    //check if the form is valid before sending
     if(!formInvalid){
      props.onSearch(searchValue);
     }
  }

const searchRef = React.useRef();

function validateForm(){
  props.formValidator(searchRef.current,'.search-field') ? setformInvalid(true) : setformInvalid(false);
}

  return (
  <form className="search-form" ref={searchRef} onChange={validateForm}>
    <input className="search-field" type="text" name="search-field" placeholder="Nature" minLength="1" value={searchValue} onChange={handleInput}/>
    <span className="search-error" id="search-error">{searchError}</span>
    <button className="search-button" type="button" onClick={handleSearch}>Search</button>
  </form>
  ) 
}