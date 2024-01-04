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


const renderCards = (Movies) => {
  const displayMovies = document.querySelector(".displayMovies");

  let obtainMovies = "";

  for (const movie of Movies) {
    obtainMovies+= createCard(movie)
  };

  return displayMovies.innerHTML+= obtainMovies;

};

renderCards(Movies)