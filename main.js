
const moviesArray = Movies;

const $filterForm = document.getElementById("id");

const $displayMovies = document.querySelector(".displayMovies");

const $selectGenres = document.getElementById("selectGenres");

const $search = document.getElementById("search")

const $removeFilters = document.getElementById("bttnRemoveFilters")



const createCard = (movie) => {
  return `
  <article class="card">
  <img src="${movie.image}">
  <h2>${movie.title}</h2>
  <h3>${movie.tagline}</h3>
  <p>${movie.overview}</p>
  </article>
  `
};

const renderCards = (moviesToRender) => {
  
  console.log("renderCards EXECUTED");

  $displayMovies.innerHTML = "";
  
  let obtainMovies = "";
  
  moviesToRender.forEach(movie => {
    obtainMovies+= createCard(movie)
  });

  console.log(obtainMovies);
  
  $displayMovies.innerHTML+= obtainMovies;
};

renderCards(moviesArray)

function addGenreToSelect(movies) {
  let decompressedGenres = movies.map( movie => movie.genres).flat()

  let removeDuplicates = Array.from( new Set(decompressedGenres) );

  let genresToAdd = removeDuplicates;
  

  let saveGenresObtained = '';

  genresToAdd.forEach(genre => {
    saveGenresObtained+= `<option class="option" value="${genre}">${genre}</option>`;
  });

  $selectGenres.innerHTML+= saveGenresObtained;
}

function selectGenre(event, filteredMoviesArray) {
  const filteredMovies = [];

  const genreSelected = event.target.value;

  filteredMoviesArray.forEach(movie => movie.genres.includes(genreSelected) ? filteredMovies.push(movie) : '' ); 
}


$search.addEventListener("keyup", (event) => filterByName(event, moviesArray) )

$removeFilters.addEventListener("click", () => renderCards(moviesArray) )

$selectGenres.addEventListener("change", (event) => selectGenre(event))



function filterByName(event, moviesArray) {

  textInput = event.target.value;

  let auxArr = [...moviesArray]

  if (textInput == '') {
    console.log("noInput");
    renderCards(auxArr)
  };

  console.log(textInput === '')

  const filteredMoviesToDisplay = [];

  moviesArray.forEach(movie => {
    
    movie.title.toLowerCase().split("").includes(textInput.toLowerCase()) && textInput !== "" ? filteredMoviesToDisplay.push(movie)  :  '';
    movie.title.toLowerCase().includes(textInput.toLowerCase()) && textInput !== "" ? filteredMoviesToDisplay.push(movie)  : '';

  });

  const removedDuplicates = Array.from( new Set(filteredMoviesToDisplay) )

  renderCards(removedDuplicates);
}


