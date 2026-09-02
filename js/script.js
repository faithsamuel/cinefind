const API_KEY = "";

  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector('input[name="movie"]');
  const movieGrid = document.querySelector(".movie-grid");
  const movieDetails = document.querySelector("#movie-details");
const detailsContent = document.querySelector(".details-content");
const backButton = document.querySelector(".back-button");
const resultsHeading = document.querySelector(".results-heading");

// Poster HelperFnc
function getPosterUrl(poster) {
  return poster !== "N/A" ? poster : "./assets/images/placeholder-poster.png"
}

// N/A HelperFnc
function formatValue(value) {
  return value && value !== "N/A" ? value : "Not available";
}

// Display Movie details

function displayMovieDetails(movie) {
  const poster = getPosterUrl(movie.Poster);

  detailsContent.innerHTML = `
    <div class="details-poster">
      <img
        src="${poster}"
        alt="${movie.Title} movie poster"
      />
    </div>

    <div class="details-info">
      <h2>${movie.Title}</h2>

      <div class="details-meta">
        <span>${movie.Year}</span>
        <span>${formatValue(movie.Runtime)}</span>
        <span>⭐ ${formatValue(movie.imdbRating)}</span>
      </div>

      <p class="details-genre">${formatValue(movie.Genre)}</p>

      <p class="details-plot">${formatValue(movie.Plot)}</p>

      <p><strong>Director:</strong> ${formatValue(movie.Director)}</p>

      <p><strong>Actors:</strong> ${formatValue(movie.Actors)}</p>
    </div>
  `;
}

  async function getMovieDetails(imdbID) {
    detailsContent.innerHTML = `
    <p class="search-message">Loading movie details...</p>
  `;

  try {
     const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovieDetails(data);
    } else {
      detailsContent.innerHTML = `
        <p class="search-message">${data.Error}</p>
      `;
    }
    
  } catch (error) {
   console.error(error);

    detailsContent.innerHTML = `
      <p class="search-message">
        Something went wrong. Please try again.
      </p>
    `;
  }
}



  getMovieDetails("tt0372784");


  // Displays Movies
  function displayMovies(movies){

    movieGrid.innerHTML = "";
    movies.map((movie) => {
        const poster =
      getPosterUrl(movie.Poster);

        const movieCard = `
          <div class="movie-card" data-imdb-id="${movie.imdbID}">
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
        resultsHeading.textContent = `Results for "${movie}" (${data.totalResults})`;
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

    document.querySelector(".results-section").style.display = "none";
movieDetails.style.display = "block";

     window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

    getMovieDetails(imdbID);
  })


  // Back btn handler 

  backButton.addEventListener("click", () => {
  movieDetails.style.display = "none";
  document.querySelector(".results-section").style.display = "block";
});

  