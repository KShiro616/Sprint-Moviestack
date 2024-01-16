import { getMovies } from "./Modules/fetch.js";

import { $displayMovies } from "./Modules/Constants.js";

function createCard(movie) {
  return `
  <article class="card">

  <img src="https://moviestack.onrender.com/static/${movie.image}">
  <h2>${movie.title}</h2>
  <h3>${movie.tagline}</h3>
  <p>${movie.overview}</p>
  <a href="details.html?id=${movie.id}"> See more </a>

  <svg data-clicked-card-movie-id="${movie.id}" class="svg-heart h-7 w-7 overflow-visible self-end">
  <g transform="translate(0 -1028.4)">
  <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/>
  </g>
  </svg>

  </article>
  `
};

function renderCards(moviesToRender) {
  $displayMovies.innerHTML = "";

  $displayMovies.classList.remove("tablesStyling")

  let obtainMovies = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  for (const movie of moviesToRender) {
    let isFav = false;

    for (const fav of favorites) {

      if (fav == movie.id) {
        isFav = true;
        obtainMovies += createCard(movie, isFav)
        isFav = false;
      }

    }
    if(!obtainMovies.includes(movie.id)){
    obtainMovies += createCard(movie, isFav)}
    
  }

  $displayMovies.innerHTML += obtainMovies;
  return moviesToRender;
};

getMovies()
  .then(moviesArray => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const matchedFavorites = [];

    for (const movie of moviesArray) {
      for (const fav of favorites) {
        if (fav == movie.id) {
          matchedFavorites.push(movie)
        }
      }
    }

    renderCards(matchedFavorites)

  })
  .catch(error => console.error(error))


$displayMovies.addEventListener("click", (event) => {
  const clickedOn = event.target;
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (clickedOn.classList.contains("svg-heart")) {

    const movieId = clickedOn.dataset.clickedCardMovieId;
    const updateFavorites = favorites.filter(id => id !== movieId)

    localStorage.setItem("favorites", JSON.stringify(updateFavorites))

    getMovies()
      .then(moviesArray => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const matchedFavorites = [];

        for (const movie of moviesArray) {
          for (const fav of favorites) {
            if (fav == movie.id) {
              matchedFavorites.push(movie)
            }
          }
        }

        renderCards(matchedFavorites)

      })
      .catch(error => console.error(error))
  }
})