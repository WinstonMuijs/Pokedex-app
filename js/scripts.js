
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};



const pokemonList = [
  pokemon1, pokemon2, pokemon3
];


for (let i=0; i < pokemonList.length; i++) {
   let name = pokemonList[i].name + " ";
   let type = pokemonList[i].type  + " ";
   let height = pokemonList[i].height + " ";
   document.write(`Name: ${name} Type: ${type} Height: ${height}<br>`)
}
