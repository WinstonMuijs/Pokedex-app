// variables with objects as values
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};


// IIFE for the pokemonList and it's functions
let pokemonRepository = (function () {
  let pokemonList = [pokemon1, pokemon2, pokemon3];

// add pokemon object to the list
  function add(pokemon) {
    if(typeof pokemon === 'object'){
      pokemonList.push(pokemon);
    }else{
      console.log("It's not a Pokemon");
    }
  }

// get all pokemon in the list
  function getAll() {
    return pokemonList;
  }
// shows details of the pokemon
  function showDetails(pokemon){
    console.log(pokemon);
  }
// eventListener for the click on the button
  function addEvent(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });


  }
// adds List items
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
// return global accessible functions
  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails

  };
})();



//get all pokemon in the list and for each pokemon
pokemonRepository.getAll().forEach(function(pokemon){
  //adds items to the pokemon
  pokemonRepository.addListItems(pokemon);
});
