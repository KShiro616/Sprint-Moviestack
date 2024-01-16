import { apiKey, apiURL } from "./Constants.js"

export function getMovies() {
  
  return new Promise((resolve, reject) => {
    fetch(apiURL, {
      method: "GET",
      headers: {
        'x-api-key': apiKey
      }
    })
    .then( response => response.json() )
    .then( data => {
      resolve(data.movies)
    })
    .catch( error => {
      reject(`Movies not fetched! Error ${error}`)
    })
  })
}


