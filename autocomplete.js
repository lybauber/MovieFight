
//funcion de autocompletar que recibe varios parametros que se destructuraron para poder realizar un función reutilizable.


const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData})=> {
    root.innerHTML = `
    <label><b>Buscar</b></label>
    <input class='input' />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
                
            </div>
        </div>
    </div>
    `


    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const results = root.querySelector('.results');




    const onInput = async event =>{
    const items = await fetchData(event.target.value);

    if(!items.length){
            dropdown.classList.remove('is-active');
            return;
    }
    results.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let item of items){
        const option = document.createElement('a');
        

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item);
        option.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
            onOptionSelect(item);
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
}




