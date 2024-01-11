
const moviesArray = Movies;

const $filterForm = document.getElementById("id");

const $displayMovies = document.querySelector(".displayMovies");

const $selectGenres = document.getElementById("selectGenres");

const $search = document.getElementById("search")

const $removeFilters = document.getElementById("bttnRemoveFilters")

$displayMovies.addEventListener("click", (event) => displayCardInfo(event, moviesArray))


function displayCardInfo(event) {

  $displayMovies.innerHTML = '';

  cardInfo = event.target.parentElement.id;

  console.log(cardInfo)

  const movieData = moviesArray[cardInfo] 
  
  const table = document.createElement("table")
  table.innerHTML+= `
  <thead>
    <th>genre</th>
    <th>OL</th>
    <th>overview</th>
    <th>popularity</th>
    <th>release date</th>
    <th>title</th>
    <th>vote average</th>
    <th>vote count</th>
    <th>homepage</th>
    <th>revenue</th>
    <th>runtime</th>
    <th>status</th>
    <th>tagline</th>
    <th>budget</th>
  </thead>
  <tbody>
  <tr>
    <td>${movieData.genres.toString()}</td>
    <td>${movieData.original_language}</td>
    <td>${movieData.overview}</td>
    <td>${movieData.popularity}</td>
    <td>${movieData.release_date}</td>
    <td>${movieData.title}</td>
    <td>${movieData.vote_average}</td>
    <td>${movieData.vote_count}</td>
    <td>${movieData.homepage}</td>
    <td>${movieData.revenue}</td>
    <td>${movieData.runtime}</td>
    <td>${movieData.status}</td>
    <td>${movieData.tagline}</td>
    <td>${movieData.budget}</td>
  <tr>
  </tbody>
  `

  $displayMovies.appendChild(table)
}



const createCard = (movie, id) => {
  return `
  <article class="card" id="${id}">
  <img src="${movie.image}">
  <h2>${movie.title}</h2>
  <h3>${movie.tagline}</h3>
  <p>${movie.overview}</p>
  </article>
  `
};

const renderCards = (moviesToRender) => {
  
  $displayMovies.innerHTML = "";
  
  let obtainMovies = "";

  let cardIndex = 0;
  
  moviesToRender.forEach(movie => {
    obtainMovies+= createCard(movie, cardIndex)
    cardIndex++
  });
  
  $displayMovies.innerHTML+= obtainMovies;

  return moviesToRender;
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

addGenreToSelect(moviesArray)



$removeFilters.addEventListener("click", () => renderCards(moviesArray) )

$search.addEventListener("keyup", (event) => renderCards(filterByName(event, moviesArray)) )

$selectGenres.addEventListener("change", (event) => genreSelector(event))

function genreSelector(event) {
  if (event.target.value === "All Genres") {
    renderCards(moviesArray)
  } else {
    const filteredMovies = selectGenre(event, moviesArray);
    renderCards(filteredMovies)
  }
};

function selectGenre(event, allMovies) {

  
  const genreSelected = event.target.value;
  
  const filteredMovies = [];

  allMovies.forEach(movie => movie.genres.includes(genreSelected) ? filteredMovies.push(movie) : '' ); 

  return filteredMovies;
}

function filterByName(event, moviesArray) {

  textInput = event.target.value;

  if (textInput === "") return renderCards(moviesArray);
  
  const filteredMoviesToDisplay = []
  
  moviesArray.forEach(movie => {  
    movie.title.toLowerCase().split("").includes(textInput.toLowerCase()) && textInput !== "" ? filteredMoviesToDisplay.push(movie)  :  '';
    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[0]) && textInput !== "" ? filteredMoviesToDisplay.push(movie)  : '';
    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[1]) && textInput !== "" ? filteredMoviesToDisplay.push(movie)  : '';
  });

  const removeDuplicates = new Set (filteredMoviesToDisplay)

  return removeDuplicates;
}


