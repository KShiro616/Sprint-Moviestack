const arrayMovies = Movies;

const cardID = location.search;

const urlParams = new URLSearchParams(cardID).get("id");

let obtainMovie;

for (const movie of arrayMovies) {
  if(movie.id == urlParams) obtainMovie = movie;
}

console.log(obtainMovie)


function displayCardInfo(obtainMovie) {

  const $displayTables = document.querySelector(".goku");

  $displayTables.classList.add("tablesStyling")

  const movieData = obtainMovie;

  const table1 = document.createElement("table");

  const table2 = document.createElement("table");

  const movieImage = document.createElement("div");
  movieImage.innerHTML+= `
  <h1> ${movieData.title}</h1>
  <img src="${movieData.image}" alt="image for the ${movieData.title} movie">
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
  <td>${movieData.budget}</td>
  <td>${movieData.revenue}</td>
  <tr>
  </tbody>
  `
  $displayTables.appendChild(table1)
  $displayTables.appendChild(movieImage)
  $displayTables.appendChild(table2)
}

displayCardInfo(obtainMovie)
