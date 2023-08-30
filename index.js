// se crea un objeto con diferentes funciones
const autoCompleteConfig = {
    // Algunas peliculas nocuentan con imagen por eso se decide si mostrar la imagen o dejar el espacio vacio
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
         return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
         `
    },
    inputValue(movie){
        return movie.Title
    },
     async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '8321b4ae',
                s: searchTerm
            }
        });
    
        if (response.data.Error){
            return [];
        }
        return response.data.Search;
    }
}

//Se llama dos veces la funcion de autocompletado para la busqueda de la izquierda y derecha

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelector(movie, document.querySelector('#left-summary'));
    },
});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelector(movie, document.querySelector('#right-summary'));
    },
});
    

// funcion que llama los datos de la pelicula seleccionada por medio del codigo imdbID
const onMovieSelector = async (movie, summaryElement) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8321b4ae',
            i: movie.imdbID
        }
        });
        
    summaryElement.innerHTML = movieTemplate(response.data);
    }


// función que muestra la información de cada pelicula seleccionada
const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-black">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-black">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-black">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-black">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-black">
            <p class="title">${movieDetail.imdbVotes}</p> 
            <p class="subtitle">IMDB Votes</p>
        </article>
     
        
    `
}