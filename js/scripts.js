// variables with objects as values
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};


// array of variables (pokemons) in IIFE and with add and getAll function
let pokemonRepository = (function () {
  let pokemonList = [pokemon1, pokemon2, pokemon3];
// add function: adds pokemon to the list with typeof control before adding.
  function add(pokemon) {
    if(typeof pokemon === 'object'){
      pokemonList.push(pokemon);
    }else{
      document.write("It's not a Pokemon");
    }
  }
//getAll function: get all pokemon on the List
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

//forEach function to get all pokemons on the list, checks the keys and write them to the html document.
pokemonRepository.getAll().forEach(function(pokemon){
  document.write("<hr>");
  Object.keys(pokemon).forEach(function(property){
    if(property === 'name' && pokemon[property] !=''){
      document.write("Name is: " + "<h3 style='color:yellow;'>" + pokemon[property] + "</h3>");
    }else if(property === 'type' && pokemon[property] != []){
      document.write("<p style ='color:lightblue;'>" + "Type is: " + pokemon[property] + "</p>");
    }else if(property === 'height' && pokemon[property] > 0){
      document.write("<p style = 'color:lightgreen;'>"+ "Height is: " + pokemon[property] + "</p>");
    }else{
      document.write("Check your properties!")
    }
  });
});
