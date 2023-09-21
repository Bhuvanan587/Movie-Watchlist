const storage = localStorage;
const watchlistArr = JSON.parse(storage.getItem('watchlist')) || [];
const watchlistContainer = document.getElementById('watchlist-container');

watchlistArr.forEach((movieObj, index) => {
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
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
            <p><span>IMDB ID:</span> ${movieObj.imdbID}</p>
        </div>
    `;

    watchlistContainer.appendChild(movieCard);

    const removeBtn = movieCard.querySelector('.remove-btn');

    removeBtn.addEventListener('click', () => {
        // Get the index of the movie to remove from the data-index attribute
        const movieIndexToRemove = removeBtn.getAttribute('data-index');
        
        // Remove the movie from watchlistArr by index
        watchlistArr.splice(movieIndexToRemove, 1);
        
        // Update the local storage with the modified watchlistArr
        storage.setItem('watchlist', JSON.stringify(watchlistArr));
        
        // Remove the movie card from the DOM
        movieCard.remove();
    });
});
