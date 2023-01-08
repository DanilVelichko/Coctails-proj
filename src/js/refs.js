// export const STORAGE_KEY = 'CoctailsId';

export const refs = {
   //header
  backdropMenu: document.querySelector('.nav-desktop__item--js'),
  menu: document.querySelector('.favorite__list'),
  refHeaderMenuOpen: document.querySelector('.active'),
  //
  apiKey: 1,
  randomCoctailApi: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  ferstLetterSearch:
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',// после равно ставим букву в ${} для поиска
    idApiSearch: 'www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', 
};

export const event = {};
export const localStorageArr = [];
export const fetchEl = {};
export const favorites = [];

export const point = {
  galleryUl: document.querySelector('.gallery__render-box'),
  card: document.querySelectorAll('gallery__coctail_box'),
  addFavoriteButtons: document.querySelectorAll('.button__add'),
  idCocktailOnCard: document.querySelectorAll('.coctailsId'),
  paginationDiv: document.querySelector('.pagination'),
  removeFavoriteButtons: document.querySelectorAll('.button__remove'),
  modalRenderBoxCocktail: document.querySelector('.cocktail__render-box')
};

export const counter = {
  mobile: 3,
  tablet: 6,
  desktop: 9,
};

console.log('Refs js');
