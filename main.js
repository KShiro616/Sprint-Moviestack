import { getMovies } from "./fetch.js";

import { $displayMovies, $selectGenres, $search, $removeFilters } from "./variablesConstants.js";

getMovies()
  .then(moviesArray => {
    renderCards(moviesArray)
    addGenreToSelect(moviesArray)
  })
  .catch(error => {
    console.log(error);
  });

function createCard(movie) {
  return `
  <article class="card">

  <img src="https://moviestack.onrender.com/static/${movie.image}">
  <h2>${movie.title}</h2>
  <h3>${movie.tagline}</h3>
  <p>${movie.overview}</p>
  <a href="details.html?id=${movie.id}"> See more </a>

  <svg data-clicked-card-movie-id="${movie.id}" class="svg-heart" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
  <path d="m0 0h32v32h-32z"/>
  <path d="m23.5682772 3c4.9276488 0 8.4317228 4.838923 8.4317228 8.6785264l-.0026646.7231849c-.0224837 2.1029193-.2338384 3.6703575-2.2125674 6.4367237-1.8252426 2.5517843-6.302687 6.0112813-7.770696 7.1126218l-.5405544.3980353c-.2853913.1997542-1.4463788 1.0118086-2.4735176 1.7222063l-.6058855.4090084c-1.110776.7352052-2.3941145 1.519553-2.3941145 1.519553l-.0173606-.0053092c-.1004521-.0484889-.5911702-.4308281-2.1254887-1.3928162l-.8571507-.530436c-2.3754169-1.4525401-4.5778186-3.1359839-7.87293624-5.9509354-3.29511765-2.8149515-5.12706376-6.6022333-5.12706376-10.4418366 0-3.8396034 3.504074-8.6785264 8.43172279-8.6785264 4.22861021 0 6.77305081 2.13597756 7.40986361 2.7419991l.1584136.15855429.1532783-.15366107c.6281695-.59932196 3.174929-2.74689232 7.4149989-2.74689232zm0 2c-1.7922344 0-3.3374536.44676489-4.6439118 1.18914648-.6897156.39192385-1.1573132.76679529-1.3845112.99415138l-.0609291.06365091-1.4573166 1.60076466-1.4806322-1.5792237c-.0799232-.08415937-.2204876-.21442133-.4258649-.37888375-.3356147-.26875411-.7322647-.53561688-1.1873862-.78260421-1.2793787-.69429876-2.7751911-1.10700177-4.49600241-1.10700177-3.37951689 0-6.43172279 3.45666397-6.43172279 6.6785264 0 3.2577651 1.58116034 6.4907707 4.42613468 8.921174l1.13755932.9628091c2.42296599 2.0294441 4.1801433 3.3501488 5.9482411 4.4715583l1.6101148 1.0003823c.2445262.1543421.4714017.2995885.6833436.4372374l.2296065.1493125.4349571-.275469.8389552-.5453599.7892506-.5370368 2.3114439-1.6116011.3205377-.2376262c.2245689-.1678574.4688696-.3529332.7291273-.5530281l.2654371-.2050199c1.0294602-.7987606 2.0583323-1.6380264 3.0135351-2.4742421.5956069-.5214137 1.1431543-1.0250567 1.6318796-1.5038598.7788598-.7630473 1.3878658-1.4435407 1.7879435-2.0028702l.3382913-.4827101c1.31709-1.9257078 1.5036416-2.8543542 1.5036416-5.5136504 0-3.22186243-3.0522059-6.6785264-6.4317228-6.6785264z" fill="#000000" fill-rule="nonzero"/>
  </g>
  </svg>

  </article>
  `
};  

function renderCards(moviesToRender) {
  $displayMovies.innerHTML = "";

  $displayMovies.classList.remove("tablesStyling")

  let obtainMovies = "";

  moviesToRender.forEach(movie => {
    obtainMovies += createCard(movie)
  });

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
  /*Here instead of adding a bazillion event listeners, 
  I just check if the target clicked upon contains the svg-heart class; 
  if so, proceed with the logic. I've used this approach as Nico told 
  me to try to avoid having too many event listeners;
   in this case, I would've added an event listener for every svg but that's not ideal as I'd have +180 event listeners. */
  if (clickedOn.classList.contains("svg-heart")) {
    const movieId = clickedOn.dataset.clickedCardMovieId

    saveToFavorites(movieId)
  }


  
})

function saveToFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(movieId)) {
      favorites.push(movieId);
      return localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    removeFromFavorites(movieId)


}

function removeFromFavorites(movieId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updateFavorites = favorites.filter(id => id !== movieId ) 

  return localStorage.setItem("favorites", JSON.stringify(updateFavorites))
}





