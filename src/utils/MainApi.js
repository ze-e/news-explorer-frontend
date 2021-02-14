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

  addCard(name, link){
    return fetch(`${this.baseURL}/artiles`,{
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          link: link
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
        authorization: this.token,
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