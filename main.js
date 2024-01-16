import { getMovies } from "./Modules/fetch.js";

import { $displayMovies, $selectGenres, $search, $removeFilters } from "./Modules/Constants.js";

getMovies()
  .then(moviesArray => {
    renderCards(moviesArray)
    addGenreToSelect(moviesArray)
  })
  .catch(error => {
    console.log(error);
  });

function createCard(movie, isFav) {

  if (isFav) {
    return `
    <article class="card h-auto justify-between overflow-hidden bg-black">

    <div class="flex flex-col">
    <img src="https://moviestack.onrender.com/static/${movie.image}">
    <h2 class="text-xl text-purple-800">${movie.title}</h2>
    <h3 class="text-sl text-pink-700">${movie.tagline}</h3>
    <p >${movie.overview}</p>
    </div>
  
    <div class="flex justify-between">
    <a class="p-1 bg-purple-400 border rounded-xl" href="details.html?id=${movie.id}"> See more </a>
  
    <svg data-clicked-card-movie-id="${movie.id}" class="heart-svg h-7 w-7 overflow-visible self-end">
    <g transform="translate(0 -1028.4)">
    <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/>
    </g>
    </svg>
    </div>
  
    </article>
    `
  }
  return `
  <article class="card h-auto justify-between overflow-hidden bg-black">

  <div class="flex flex-col">
  <img src="https://moviestack.onrender.com/static/${movie.image}">
  <h2 class="text-xl text-purple-800">${movie.title}</h2>
  <h3 class="text-sl text-pink-700">${movie.tagline}</h3>
  <p >${movie.overview}</p>
  </div>

  <div class="flex justify-between">
  <a class="p-1 bg-purple-400 border rounded-xl" href="details.html?id=${movie.id}"> See more </a>

  <svg data-clicked-card-movie-id="${movie.id}" class="heart-svg h-7 w-7 overflow-visible self-end">
  <g transform="translate(0 -1028.4)">
  <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" stroke="#c0392b" fill="none" stroke-width="1"/>
</g>
  </svg>
  </div>

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

function addGenreToSelect(movies) {
  let decompressedGenres = movies.map(movie => movie.genres).flat()

  let removeDuplicates = Array.from(new Set(decompressedGenres));

  let genresToAdd = removeDuplicates;

  let saveGenresObtained = '';

  genresToAdd.forEach(genre => {
    saveGenresObtained += `<option class="option" value="${genre}">${genre}</option>`;
  });

  $selectGenres.innerHTML += saveGenresObtained;
}

$removeFilters.addEventListener("click", () => {
  $search.value = "";
  $selectGenres.value = "All Genres";
  getMovies()
    .then(moviesArray => {
      renderCards(moviesArray)
    })
    .catch(error => console.error(error))
})

$search.addEventListener("input", () => {
  getMovies()
    .then(moviesArray => {
      const filtered = selectGenre($selectGenres, moviesArray); //Always call the functions within the promise resolve!!
      renderCards(filterByName($search, filtered))
    })
    .catch(error => console.error(error));
})

$selectGenres.addEventListener("change", () => {
  getMovies()
    .then(moviesArray => {
      const filtered = selectGenre($selectGenres, moviesArray);
      renderCards(filterByName($search, filtered))
    })
    .catch(error => console.error(error));
})

//Using filter saved me quite a few lines of code instead of using forEach and then pushing everything that may match into a "filtered" array. Almost feels like cheating!

function selectGenre(event, allMovies) {
  const genreSelected = event.value;

  if (genreSelected === "All Genres") return allMovies;

  return allMovies.filter(movie => movie.genres.includes(genreSelected));
}

function filterByName(event, moviesArray) {
  const textInput = event.value;

  if (!textInput) return moviesArray;

  return moviesArray.filter(movie => movie.title.toLowerCase().includes(textInput.toLowerCase()))
}

$displayMovies.addEventListener("click", (event) => {
  const clickedOn = event.target;
  const movieId = clickedOn.dataset.clickedCardMovieId;

  console.log(clickedOn);

  if (clickedOn.classList.contains("heart-svg")) {
    saveToFavorites(movieId, clickedOn)
    } 

})

function saveToFavorites(movieId, clickedOn) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    clickedOn.innerHTML = `
    <g transform="translate(0 -1028.4)">
    <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/>
  </g>
    `
    return localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  removeFromFavorites(movieId, clickedOn)
}

function removeFromFavorites(movieId, clickedOn) {

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updateFavorites = favorites.filter(id => id !== movieId)

  clickedOn.innerHTML = `
  <g transform="translate(0 -1028.4)">
  <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" stroke="#c0392b" fill="none" stroke-width="1"/>
</g>
  `
  return localStorage.setItem("favorites", JSON.stringify(updateFavorites))
}





