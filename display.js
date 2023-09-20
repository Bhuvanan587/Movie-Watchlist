const storage = localStorage;
const watchlistArr = JSON.parse(storage.getItem('watchlist')) || [];

watchlistArr.forEach(movieObj => {
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
        </div>
            <p><span>IMDB ID:</span> ${movieObj.imdbID}</p>
        </div>
    `;

    document.getElementById('watchlist-container').appendChild(movieCard);
})