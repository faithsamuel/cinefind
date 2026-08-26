// const API_KEY = "";

  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector('input[name="movie"]');
  const movieGrid = document.querySelector(".movie-grid");

  function displayMovies(movies){
    movieGrid.innerHTML = "";
    movies.map((movie) => {
        const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "./assets/images/placeholder-poster.png";

        const movieCard = `
          <div class="movie-card">
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


  