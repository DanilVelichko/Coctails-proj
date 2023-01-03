export const refs = {
    apiKey: 1,
    randomCoctailApi: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    ferstLetterSearch: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=', // после равно ставим букву в ${} для поиска 
};

export const event = {

};

export const fetchEl = {

};


export const point = {
    galleryUl: document.querySelector('.gallery__render-box'),
    card: document.querySelectorAll('gallery__coctail_box'),
    addFavoriteButtons: document.querySelectorAll('.button__add'),
    idCocktailOnCard: document.querySelectorAll('.coctailsId'),
};

export const counter = {
    mobile: 3,
    tablet: 6,
    desktop: 9,
};
