let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Add a pokemonObject to the pokemonList
  function add(pokemon) {
    if(typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon){
      pokemonList.push(pokemon);
    }else{
      console.log("It's not a Pokemon");
    }
  }
//Get All pokemonObjets in the pokemonList
  function getAll() {
    return pokemonList;
  }
//Shows the details of pokemonObjects
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
     });
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

// Modal
let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.addEventListener('click', hideModal);

  //Pokemon name as title
  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let contentElement = document.createElement('p');
  //Items of Pokemon
  contentElement.innerHTML = "Height: "+pokemon.height+"<br>";
  //..and types
  let types = [];
  pokemon.types.forEach(function(type){
    types.push(" "+type.type.name);
  });
  //one or multiple types?
  if (types.length<2) {
    contentElement.innerHTML += "Type:";
  } else {
    contentElement.innerHTML += "Types:";
  }
  contentElement.innerHTML += types.toString();

  //image of pokemon
  let imageElement = document.createElement('img');
  imageElement.classList.add('pokemon-img');
  imageElement.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(imageElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  modal.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  })
  modal.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    swipe(pokemon);
  })

}

//Hide modal
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


//Swipe function;
let touchstartX = 0;
let touchendX = 0;

function swipe(pokemon) {
//swipe left
  if ((touchendX < (touchstartX-50)) && (pokemonList.indexOf(pokemon) < (pokemonList.length-1))) {
    hideModal();
    showDetails(pokemonList[pokemonList.indexOf(pokemon)+1]);
    touchstartX = 0;
    touchendX = 0;
  }
//swipe right
  if ((touchendX > (touchstartX+50)) && (pokemonList.indexOf(pokemon) > 0)) {
    hideModal();
    showDetails(pokemonList[pokemonList.indexOf(pokemon)-1]);
    touchstartX = 0;
    touchendX = 0;
  }
}


//Returns the functions of IIFE
  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails


  };
})();


//Load all Objects(list) from API
pokemonRepository.loadList().then(function() {
  //Get all Objects from list
  pokemonRepository.getAll().forEach(function(pokemon){
    //Add items to Objects
    pokemonRepository.addListItems(pokemon);
  });
});
