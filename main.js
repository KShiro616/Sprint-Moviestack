
const moviesArray = Movies;

const $filterForm = document.getElementById("id");

const $displayMovies = document.querySelector(".displayMovies");

const $selectGenres = document.getElementById("selectGenres");

const $search = document.getElementById("search")

const $removeFilters = document.getElementById("bttnRemoveFilters")

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

  if (!event.target.value) return moviesArray;

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
  $displayMovies.innerHTML = "";

  $displayMovies.classList.remove("tablesStyling")

  let obtainMovies = "";

  let cardIndex = 0; //As I add an "index" as each card's Id, it becomes signigicantly simpler to display each card's info.

  moviesToRender.forEach(movie => {
    obtainMovies += createCard(movie, cardIndex)
    cardIndex++
  });

  $displayMovies.innerHTML += obtainMovies;

  const allCards = document.querySelectorAll(".card")

  allCards.forEach(card => card.addEventListener("click", (event) => {
    const movieID = moviesArray[card.id]

    window.location.href = `./details.html?id=${movieID.id}`
  }))

  return moviesToRender;
};

renderCards(moviesArray)

addGenreToSelect(moviesArray)
