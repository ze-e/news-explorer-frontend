import {proxyURL, APIkey} from '../config/config';

class NewsApi{
  constructor({baseURL, APIkey}){
    this.baseURL = baseURL;
    this.APIkey = APIkey;
  }

  //api
  getResults(){
    return fetch(`${this.baseURL + this.APIkey}&from=${Date.now()}&to=${Date.now()+7}&pageSize=100`,{
      headers: {
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

  const newsApi = new NewsApi({
    baseURL : proxyURL,
    APIkey : APIkey
  });
  
  export {newsApi};