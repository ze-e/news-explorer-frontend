import {baseURL} from '../config/config';

class MainApi{
  constructor({baseURL}){
    this.baseURL = baseURL;
  }

  setToken(token){
    this.token = token;
  }
  
  /* API FUNCTIONS */
  //user
  getUser(){
    return fetch(`${this.baseURL}/users/me`,{
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }
  
  getCards(){
    return fetch(`${this.baseURL}/articles`,{
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  addCard(card){
    return fetch(`${this.baseURL}/articles`,{
      method: "POST",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword: card.keyword,
          link: card.link,
          image: card.image,
          date: card.date,
          title: card.title,
          text: card.text,
          source: card.source
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  deleteCard(articleId){
    return fetch(`${this.baseURL}/articles/${articleId}`,{
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }
}
const mainApi = new MainApi({
  baseURL : baseURL, 
});

export {mainApi};