import {baseURL as BASE_URL} from '../config/config';

class MainApi{
  constructor({BASE_URL}){
    this.BASE_URL = BASE_URL;
  }

  setToken(token){
    this.token = `Bearer ${token}`;
  }
  
  /* API FUNCTIONS */
  //user
  register(name, email, password){
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name" : name, "email" : email, "password" : password})
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  login(email, password){
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email" : email, "password" : password})
    })
    .then((response) => response.json())
    .then((res) => {
      if(res.token){
        this.setToken(res.token);
        localStorage.setItem('token', res.token);
        return res;
      }
    })
  }

  authorize(){
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.token
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
    return fetch(`${this.BASE_URL}/articles`,{
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.token
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
    return fetch(`${this.BASE_URL}/articles`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.token
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
    return fetch(`${this.BASE_URL}/articles/${articleId}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.token
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
  BASE_URL : BASE_URL, 
});

export {mainApi};