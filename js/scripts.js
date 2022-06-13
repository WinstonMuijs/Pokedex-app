
const pokemon1 = {name: 'Palkia', type: ['Dragon', 'Water'], height:4.2};
const pokemon2 = {name: 'Rapidash', type: ['Fire'], height:1.7};
const pokemon3= {name: 'Venusaur', type: ['Grass', 'Poisson'], height:2};



const pokemonList = [
  pokemon1, pokemon2, pokemon3
];

let names = []
let types = []
let heights = []

for (let i=0; i < pokemonList.length; i++) {
   names += pokemonList[i].name + "\n";
   types += pokemonList[i].type  + "\n";
   heights += pokemonList[i].height + "\n";
}

document.write(names);
document.write(types);
document.write(heights);
