let apiKey = "b4cdfba7";
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click", () => {
  let searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    displayErrorMessage("Please enter a movie title");
    return;
  }

  resultsContainer.innerHTML = "";

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        data.Search.forEach(movie => {
          fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            .then(response => response.json())
            .then(movieDetails => {
              console.log(movieDetails);
              let movieElement = createMovieElement(movieDetails);
              resultsContainer.appendChild(movieElement);
            })
            .catch(error => console.error(error));
        });
      } else {
        displayErrorMessage(data.Error);
      }
    })
    .catch(error => {
      displayErrorMessage("An error occurred. Please try again later.");
      console.error(error);
    });
});

function createMovieElement(movie) {
  let movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  let titleElement = document.createElement("h2");
  titleElement.textContent = movie.Title;

  let directorElement = document.createElement("p");
  directorElement.textContent = `Director: ${movie.Director}`;

  let yearElement = document.createElement("p");
  yearElement.textContent = `Year: ${movie.Year}`;

  let ratingElement = document.createElement("p");
  ratingElement.textContent = `Rating: ${movie.imdbRating}`;

  let posterElement = document.createElement("img");
  posterElement.src = movie.Poster;
  posterElement.alt = movie.Title;

  movieElement.appendChild(titleElement);
  movieElement.appendChild(directorElement);
  movieElement.appendChild(yearElement);
  movieElement.appendChild(ratingElement);
  movieElement.appendChild(posterElement);

  return movieElement;
}

function displayErrorMessage(message) {
  resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}
