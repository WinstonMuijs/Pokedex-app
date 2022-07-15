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

  function showLoader(){
    let loader = document.querySelector('.pokeball');
    loader.classList.remove('hide');
    let pokList = document.querySelector('.pokemon-List');
    pokList.classList.add('hide');
  }


  function hideMessage(){
    setTimeout(function(){
        let loader = document.querySelector('.pokeball');
        loader.classList.add('hide');
    },1000);
    setTimeout(function(){
        let pokList = document.querySelector('.pokemon-List');
        pokList.classList.remove('hide');
    },2000);
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

  function loadList(){
    showLoader();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoader();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideMessage();
      item.imageUrl = details.sprites.front_shiny;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      hideMessage();
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
  contentElement.innerHTML += "Weight: "+pokemon.weight+"<br>"
  let types = [];
  pokemon.types.forEach(function(type){
    types.push(" "+type.type.name);
  });
  //types one or many
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
    loadDetails: loadDetails,
    showLoader:showLoader,
    hideMessage:hideMessage


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
