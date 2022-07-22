let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Add a pokemonObject to the pokemonList
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("It's not a Pokemon");
    }
  }
  //Get All pokemonObjets in the pokemonList
  function getAll() {
    return pokemonList;
  }

  function findPokemon(name) {
    let result = pokemonList.filter(pokemon => pokemon.name.startsWith(name));
    if (result.length > 0) {
      return result[0];
    } else {
      $('#search-input').tooltip('show');
      $(document).on('click', function() {
        $('#search-input').tooltip('hide');
      });
    }
  }

  $('#search-form').submit(e => {
    e.preventDefault();
    $('#search-input').tooltip('hide');
    let searchInput = $('#search-input')
      .val()
      .toLowerCase();
    let result = findPokemon(searchInput);
    if (result) {
      showDetails(result);
      $('#exampleModalCenter').modal('show');
    }
  });

  // loader image
  function showLoader() {
    let loader = document.querySelector('.pokeball');
    loader.classList.remove('hide');
    let pokList = document.querySelector('.pokemon-List');
    pokList.classList.add('hide');
  }

  // hide loader image with setTimeout
  function hideMessage() {
    setTimeout(function() {
      let loader = document.querySelector('.pokeball');
      loader.classList.add('hide');
    }, 1000);
    setTimeout(function() {
      let pokList = document.querySelector('.pokemon-List');
      pokList.classList.remove('hide');
    }, 2000);
  }
  //Shows the details of pokemonObjects
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function addEvent(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Add the List items
  function addListItems(pokemon) {
    let pokemonNewList = document.querySelector('.pokemon-List');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    listItem.classList.add('nav-item');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModalCenter');
    button.innerText = pokemon.name;
    button.classList.add(
      'btn1',
      'group-list-item',
      'capitalize',
      'group-list-item-action'
    );
    listItem.appendChild(button);
    pokemonNewList.appendChild(listItem);
    addEvent(button, pokemon);
  }
  // load the list of pokemon
  function loadList() {
    showLoader();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideMessage();
        console.error(e);
      });
  }
  // load the details of the pokemon
  function loadDetails(item) {
    showLoader();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        hideMessage();
        item.imageUrlFront = details.sprites.front_shiny;
        item.imageUrlBack = details.sprites.back_shiny;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
      })
      .catch(function(e) {
        hideMessage();
        console.error(e);
      });
  }

  // Modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalImageFront = document.querySelector('.pokemon-img-front');
    let modalImageBack = document.querySelector('.pokemon-img-back');
    let modalHeight = document.querySelector('.pokemon-height');
    let modalWeight = document.querySelector('.pokemon-weight');
    let modalTypes = document.querySelector('.pokemon-types');
    let modalHeadline = document.querySelector('.pokemon-types-headline');
    let modalAbilities = document.querySelector('.pokemon-abilities');
    let modalAbilityHeadline = document.querySelector('.abilities-headline');

    modalTitle.empty();
    modalImageFront.empty();
    modalImageBack.empty();
    modalHeight.empty();
    modalWeight.empty();
    modalTypes.empty();
    modalHeadline.empty();
    modalAbilities.empty();
    modalAbilityHeadline.empty();

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    titleElement.classList.add('capitalize', 'font-deco');

    let imageFront = document.createElement('img');
    imageFront.classList.add('d-block', 'w-100');
    imageFront.src = pokemon.imageUrlFront;

    let imageBack = document.createElement('img');
    imageBack.classList.add('d-block', 'w-100');
    imageBack.src = pokemon.imageUrlBack;

    let heightElement = document.createElement('p');
    heightElement.innerText = pokemon.height + ' m';

    let weightElement = document.createElement('p');
    weightElement.innerText = pokemon.weight + ' kg';

    let typesElement = document.createElement('p');
    let typesHeadline = document.createElement('span');
    let types = [];
    pokemon.types.forEach(function(type) {
      types.push(' ' + type.type.name);
    });
    if (types.length < 2) {
      typesHeadline.innerHTML += 'Type:';
    } else {
      typesHeadline.innerHTML += 'Types:';
    }
    typesElement.innerHTML += types.toString();

    let abilitiesElement = document.createElement('p');
    let abilityHeadline = document.createElement('span');
    let abilities = [];
    pokemon.abilities.forEach(function(ability) {
      abilities.push(' ' + ability.ability.name);
    });
    if (abilities.length < 2) {
      abilityHeadline.innerHTML += 'Ability:';
    } else {
      abilityHeadline.innerHTML += 'Abilities:';
    }
    abilitiesElement.innerHTML += abilities.toString();

    modalTitle.append(titleElement);
    modalImageFront.append(imageFront);
    modalImageBack.append(imageBack);
    modalHeight.append(heightElement);
    modalWeight.append(weightElement);
    modalHeadline.append(typesHeadline);
    modalTypes.append(typesElement);
    modalAbilities.append(abilitiesElement);
    modalAbilityHeadline.append(abilityHeadline);
  }

  //Returns the functions of IIFE
  return {
    add: add,
    addListItems: addListItems,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    findPokemon: findPokemon
  };
})();

//Load all Objects(list) from API
pokemonRepository.loadList().then(function() {
  //Get all Objects from list
  pokemonRepository.getAll().forEach(function(pokemon) {
    //Add items to Objects
    pokemonRepository.addListItems(pokemon);
  });
});
