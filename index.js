const fetchData = async (searchTerm) => {
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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class='input' />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results">
            
        </div>
    </div>
</div>
`


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const results = document.querySelector('.results');




const onInput = async event =>{
   const movies = await fetchData(event.target.value);

   if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
   }
   results.innerHTML = '';
   dropdown.classList.add('is-active');
   for (let movie of movies){
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item')
    option.innerHTML = ` 
        <img src="${imgSrc}" />
        ${movie.Title}
    `;

    option.addEventListener('click', ()=>{
        dropdown.classList.remove('is-active');
        input.value = movie.Title;
        onMovieSelector(movie);
    })
    results.appendChild(option);
   }

   
}
input.addEventListener('input', debounce(onInput));

document.addEventListener('click', (e)=> {
    if (!root.contains(e.target)){
        dropdown.classList.remove('is-active');
    }
})

const onMovieSelector = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8321b4ae',
            i: movie.imdbID
        }
        });

    console.log(response.data);
}