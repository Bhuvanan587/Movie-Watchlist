const key = "21f49078";
const movie = document.getElementById('movieName');
const movieContainer = document.getElementById('movieContainer');
const searchBtn = document.getElementById('search');
const storage = localStorage;



searchBtn.addEventListener('click', () => {
    // Clear the movieContainer before adding new search results
    movieContainer.innerHTML = '';

    fetch(`http://www.omdbapi.com/?s=${movie.value}&apikey=${key}`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(movieObj => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movieCard');

                movieCard.innerHTML = `
                    <div>
                        <img src=${movieObj.Poster} class="movieCard-img">
                    </div>
                    <div class="movieCard-details">
                        <h4 class="movieCard-title"><span>Title:</span> ${movieObj.Title}</h4>
                    <div class="watchlist">
                    <p><span>Year:</span> ${movieObj.Year}</p>
                    <button class="watchlist-btn" id="watchlist-btn">+Watchlist</button>
                    </div>
                        <p><span>IMDB ID:</span> ${movieObj.imdbID}</p>
                    </div>
                `;

                movieContainer.appendChild(movieCard);

                const watchlistBtn = movieCard.querySelector('.watchlist-btn');

                watchlistBtn.addEventListener('click', () => {
                    const watchlist = JSON.parse(storage.getItem('watchlist')) || [];
                    
                    // Check if the movie is already in the watchlist
                    const isAlreadyAdded = watchlist.some(item => item.imdbID === movieObj.imdbID);
                    
                    if (!isAlreadyAdded) {
                        watchlist.unshift(movieObj);
                        storage.setItem('watchlist', JSON.stringify(watchlist));
                        
                        // Disable the button and change its text
                        watchlistBtn.disabled = true;
                        watchlistBtn.textContent = 'Added';
                    }
                });

            });
        });
});

// Get the watchlist container element in watchlist.html
const watchlistArr = JSON.parse(storage.getItem('watchlist')) || [];


