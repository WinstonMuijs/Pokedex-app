// variables with objects as values
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};


// array of variables (pokemons)
const pokemonList = [
  pokemon1, pokemon2, pokemon3
];

pokemonList.forEach(function(item){
  document.write("<hr>");
  Object.keys(item).forEach(function(property){
    document.write(item[property] + "<br>")
  });

});
