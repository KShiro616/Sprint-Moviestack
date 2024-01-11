
const moviesArray = Movies;

const $filterForm = document.getElementById("id");

const $displayMovies = document.querySelector(".displayMovies");

const $selectGenres = document.getElementById("selectGenres");

const $search = document.getElementById("search")

const $removeFilters = document.getElementById("bttnRemoveFilters")

function displayCardInfo(event, allMovies) {
  $displayMovies.innerHTML = '';

  cardInfo = event.target.parentElement.id;

  const movieData = allMovies[cardInfo]

  const table = document.createElement("table")
  table.innerHTML += `
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

function createCard(movie, id) {
  return `
  <article class="card" id="${id}">
  <img src="${movie.image}">
  <h2>${movie.title}</h2>
  <h3>${movie.tagline}</h3>
  <p>${movie.overview}</p>
  </article>
  `
};  

function addGenreToSelect(movies) {
  let decompressedGenres = movies.map(movie => movie.genres).flat()

  let removeDuplicates = Array.from(new Set(decompressedGenres));

  let genresToAdd = removeDuplicates; //for the sake of readability; not really necesary tho

  let saveGenresObtained = '';

  genresToAdd.forEach(genre => {
    saveGenresObtained += `<option class="option" value="${genre}">${genre}</option>`;
  });

  $selectGenres.innerHTML += saveGenresObtained;
}

$removeFilters.addEventListener("click", () => renderCards(moviesArray))

$search.addEventListener("keyup", (event) => renderCards(filterByName(event, moviesArray)))

$selectGenres.addEventListener("change", (event) => {
  const change = event;
  renderCards(selectGenre(change, moviesArray))

  $search.addEventListener("keyup", (event) => {
    const filtered = filterByName(event, moviesArray)
    renderCards(selectGenre(change, filtered))
  })

  })

function selectGenre(event, allMovies) {
  const genreSelected = event.target.value;

  if (genreSelected === "All Genres") return allMovies;

  const filteredMovies = [];

  allMovies.forEach(movie => movie.genres.includes(genreSelected) ? filteredMovies.push(movie) : '');

  return filteredMovies;
}

function filterByName(event, moviesArray) {
  const textInput = event.target.value;

  if (!event.target.value) {return moviesArray} else console.log(event.target.value ? event.target.value : "false")

  const filteredMovies = [];

  moviesArray.forEach(movie => {
    movie.title.toLowerCase().split("").includes(textInput.toLowerCase()) && textInput !== "" ? filteredMovies.push(movie) : '';
    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[0]) && textInput !== "" ? filteredMovies.push(movie) : '';
    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[1]) && textInput !== "" ? filteredMovies.push(movie) : '';
  });

  const removeDuplicates = Array.from(new Set(filteredMovies))

  return removeDuplicates;
}


function renderCards(moviesToRender) {
  console.log(`${moviesToRender} renderCards`)

  $displayMovies.innerHTML = "";

  let obtainMovies = "";

  let cardIndex = 0; //As I add an "index" as each card's Id, it becomes signigicantly simpler to display each card's info.

  moviesToRender.forEach(movie => {
    obtainMovies += createCard(movie, cardIndex)
    cardIndex++
  });

  $displayMovies.innerHTML += obtainMovies;

  const allCards = document.querySelectorAll(".card")
  allCards.forEach(card => card.addEventListener("click", (event) => displayCardInfo(event, moviesToRender)))

  return moviesToRender;
};

renderCards(moviesArray)

addGenreToSelect(moviesArray)
