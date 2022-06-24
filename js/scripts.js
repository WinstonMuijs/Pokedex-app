let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if(typeof pokemon === 'object'){
      pokemonList.push(pokemon);
    }else{
      console.log("It's not a Pokemon");
    }
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }


  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList


  };
})();



pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItems(pokemon);
  });
});
