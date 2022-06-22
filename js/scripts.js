// variables with objects as values
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};

// array of variables (pokemons)



let pokemonRepository = (function () {
  let pokemonList = [pokemon1, pokemon2, pokemon3];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function addEvent(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });


  }

  function addListItems(pokemon){
    let pokemonNewList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    listItem.appendChild(button);
    pokemonNewList.appendChild(listItem);
    addEvent(button, pokemon);
  }

  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails

  };
})();




pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItems(pokemon);
});
