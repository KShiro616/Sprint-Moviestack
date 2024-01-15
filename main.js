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
  
  <a href="details.html?id=${movie.id}"> See more </a>
  
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

$removeFilters.addEventListener("click", () => {
  $search.value = "";
  $selectGenres.value = "All Genres";
  renderCards(moviesArray);
})

$search.addEventListener("keyup", (event) => {
  const keyup = event;

  // renderCards(filterByName($search, moviesArray))

  const filtered = selectGenre($selectGenres, moviesArray)
  renderCards(filterByName($search, filtered))

  // $selectGenres.addEventListener("change", (event) => {
  // })
})

$selectGenres.addEventListener("change", (event) => {
  // const change = event;

  // renderCards(selectGenre(change, moviesArray))

  // $search.addEventListener("keyup", (event) => {
  //   const filtered = filterByName(event, moviesArray)
  //   renderCards(selectGenre(change, filtered))
  // })

  const filtered = selectGenre($selectGenres, moviesArray)
  renderCards(filterByName($search, filtered))


})

function selectGenre(event, allMovies) {
  const genreSelected = event.value;

  if (genreSelected === "All Genres") return allMovies;

  const filteredMovies = [];

  allMovies.forEach(movie => movie.genres.includes(genreSelected) ? filteredMovies.push(movie) : '');

  return filteredMovies;
}

function filterByName(event, moviesArray) {
  const textInput = event.value;

  if (!textInput) return moviesArray;

  const filteredMovies = [];

  moviesArray.forEach(movie => {
    movie.title.toLowerCase().split("").includes(textInput.toLowerCase()) ? filteredMovies.push(movie) : '';

    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[0]) ? filteredMovies.push(movie) : '';
    
    movie.title.toLowerCase().includes(textInput.toLowerCase().split(" ")[1]) ? filteredMovies.push(movie) : '';
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

  // const allCards = document.querySelectorAll(".card")

  // allCards.forEach(card => card.addEventListener("click", (event) => {
  //   const movieID = moviesArray[card.id]

  //   window.location.href = `./details.html?id=${movieID.id}`
  // }))

  return moviesToRender;
};

renderCards(moviesArray)

addGenreToSelect(moviesArray)

const numeros = [23, 7, 45, 12, 36, 5, 49, 18, 30, 8];

const numerosFiltrados = numeros.filter(num => num >= 10);

const numerosOrdenados = numerosFiltrados.sort((a, b) => b - a)

const sumaNumeros = numerosOrdenados.reduce((acumulador, numeroIterado) => acumulador+= numeroIterado)


const primerInpar = numerosOrdenados.find(numeroInpar => numeroInpar % 2 !== 0)

console.log(primerInpar)

