import { getMovies } from "./Modules/fetch.js";

const cardID = location.search;

const urlParams = new URLSearchParams(cardID).get("id");

let obtainMovie = [];


getMovies()
  .then(moviesArray => {
    for (const movie of moviesArray) {
      if(movie.id == urlParams) obtainMovie.push(movie);
    }
    displayCardInfo(obtainMovie) //always invoke the function within the promise!!!!
  })

  .catch(error => console.log(error))

function displayCardInfo(obtainMovie) {

  obtainMovie = obtainMovie[0];

  const $displayTables = document.querySelector(".displayTables");

  $displayTables.classList.add("tablesStyling")

  const movieData = obtainMovie;

  const table1 = document.createElement("table");

  const table2 = document.createElement("table");

  const details = document.createElement("article")
  details.innerHTML+= `
  <h1> ${movieData.title}</h1>
  <h3> ${movieData.tagline}</h3>
  <p> ${movieData.overview}</p>
  `

  const movieImage = document.createElement("div");
  movieImage.innerHTML+= `
  <img src="https://moviestack.onrender.com/static/${movieData.image}" alt="image for the ${movieData.title} movie">
  `

  table1.innerHTML += `
  <thead>
    <th>Original Language</th>
    <th>Release Date</th>
    <th>Runtime</th>
    <th>Status</th>
    </thead>
  <tbody>
  <tr>
  <td>${movieData.original_language}</td>
  <td>${movieData.release_date}</td>
  <td>${movieData.runtime}</td>
  <td>${movieData.status}</td>
  <tr>
  </tbody>
  `
  table2.innerHTML += `
  <thead>
    <th>vote average</th>
    <th>budget</th>
    <th>revenue</th>
    </thead>
  <tbody>
  <tr>
  <td>${movieData.vote_average}</td>
  <td>${Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(movieData.budget)}USD</td>
  <td>${Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(movieData.revenue)}USD</td>
  <tr>
  </tbody>
  `
  $displayTables.appendChild(movieImage)
  $displayTables.appendChild(details)
  $displayTables.appendChild(table1)
  $displayTables.appendChild(table2)
}
