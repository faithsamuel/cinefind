const API_KEY = "";

  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector('input[name="movie"]');
  const movieGrid = document.querySelector(".movie-grid");
  const movieDetails = document.querySelector("#movie-details");
const detailsContent = document.querySelector(".details-content");
const backButton = document.querySelector(".back-button");



// Display Movie details

function displayMovieDetails(movie) {
  detailsContent.innerHTML = `
    <div class="details-poster">
      <img
        src="${movie.Poster}"
        alt="${movie.Title} movie poster"
      />
    </div>

    <div class="details-info">
      <h2>${movie.Title}</h2>

      <div class="details-meta">
        <span>${movie.Year}</span>
        <span>${movie.Runtime}</span>
        <span>⭐ ${movie.imdbRating}</span>
      </div>

      <p class="details-genre">${movie.Genre}</p>

      <p class="details-plot">${movie.Plot}</p>

      <p><strong>Director:</strong> ${movie.Director}</p>

      <p><strong>Actors:</strong> ${movie.Actors}</p>
    </div>
  `;
}

  async function getMovieDetails(imdbID) {
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // console.log(data);

  displayMovieDetails(data);
}

  getMovieDetails("tt0372784");


  // Displays Movies
  function displayMovies(movies){
    movieGrid.innerHTML = "";
    movies.map((movie) => {
        const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "./assets/images/placeholder-poster.png";

        const movieCard = `
          <div class="movie-card" data-imdb-id="${movie.imdbID}>
         <img
          src="${poster}"
          alt="${movie.Title} movie poster"
        />

        <div class="movie-info">
          <h3>${movie.Title}</h3>

          <div class="movie-meta">
            <span>${movie.Year}</span>
            <span>${movie.Type}</span>
          </div>
        </div>
      </div>
        `;

        movieGrid.innerHTML += movieCard
    });
  }


  async function searchMovies(movie) {
    movieGrid.innerHTML = `
  <p class="search-message">Searching for movies...</p>
`;
   try {
     const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    if(data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieGrid.innerHTML = `
  <p class="search-message">${data.Error}</p>
`;
    }
   } catch (error) {
    console.error(error);

    movieGrid.innerHTML = `
      <p class="search-message">
        Something went wrong. Please try again.
      </p>
    `;
   }
  }

  

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const movie = searchInput.value.trim();

    if (movie) {
        searchMovies(movie)
    }
  })

  movieGrid.addEventListener("click", (event)=> {
    const movieCard = event.target.closest(".movie-card");

    if(!movieCard) return;

    const imdbID = movieCard.dataset.imdbId;

    // console.log(imdbID);
    getMovieDetails(imdbID);

    document.querySelector(".results-section").style.display = "none";
movieDetails.style.display = "block";
  })


  // Back btn handler 

  backButton.addEventListener("click", () => {
  movieDetails.style.display = "none";
  document.querySelector(".results-section").style.display = "block";
});

  