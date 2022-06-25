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
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
     });
  }

  function addEvent(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function showLoadingMessage(){
    let loadingMessage = document.querySelector('.container');
    let paragraph = document.createElement('p');
    paragraph.innerText = 'THe Pokemon are Loading';
    loadingMessage.appendChild(paragraph);
  }

  function hideLoadingMessage(){
    let elementToRemove = document.querySelector('p');
    elementToRemove.parentElement.removeChild(elementToRemove);
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
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }



  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails


  };
})();



pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItems(pokemon);
  });
});
