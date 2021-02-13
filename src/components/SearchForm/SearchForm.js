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
    if(!formInvalid){
      props.onSearch(searchValue);
    }
  }

const searchRef = React.useRef();

function validateForm(){
  props.formValidator(searchRef.current,'.popup__input') ? setformInvalid(true) : setformInvalid(false);
}

  //reset fields when opened
  React.useEffect(()=>{
    setsearchValue('');
    setsearchError('');
    setformInvalid(true);
  },[props.isOpen])

  return (
      <form className="search-form" onChange={validateForm} ref={searchRef}>
        <input className="search-field" type="search" placeholder="Nature" value={searchValue} onChange={handleInput}/>
        <span className="search-error" id="search-error" minLength="1" >{searchError}</span>
        <button className="search-button" type="button" onClick={handleSearch}>Search</button>
      </form>
  ) 
}