// variables with objects as values
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};


// array of variables (pokemons)
const pokemonList = [
  pokemon1, pokemon2, pokemon3
];

// loop over array of variables to get the properties of the objects in variables
for (let i=0; i < pokemonList.length; i++) {
  // objects name
  let name = pokemonList[i].name;
  // objects Type
  let type = pokemonList[i].type;
  // objects height
  let height = pokemonList[i].height;
  // if height is less or equal to 2
  if(height <= 2){
    // then write on document
    document.write("<hr>");
    document.write(`Name: ${name}<br> Type: ${type} <br> Height: ${height}<br>`);
    // if height higher then 2
  } else{
    // write on document
    document.write("<hr>");
    document.write(`Name: ${name}<br> Type: ${type} <br> Height: ${height} --> Wow Thats Big!! <br>`)
  }
}
