import { refs, fetchEl, point, counter, localStorageArr } from './refs.js';
import { saveInLocalStorage, loadFromLocalStorage } from './global-functions.js';


// ADD To and Remove cards to Favorites //
point.galleryUl.addEventListener('click', addToFavorite);

function addToFavorite(e) {
    localStorageArr.push(e.target.children[1].textContent);
    saveInLocalStorage('CoctailsId', localStorageArr);

}

function removeFromFavorite(e) {
    localStorageArr.filter(coctailId => coctailId !== e.target.children[1].textContent);
   saveInLocalStorage('CoctailsId', localStorageArr);

}

console.log('Подключена страница Favorite button js');

 


// window.addEventListener('load', init);

// function init(){
//     point.addFavoriteButtons.forEach( card => {
//         card.addEventListener('click', addToFavorite);
//         console.log('forEach card');
//     });
// }

// point.galleryUl.addEventListener('click', onClick);

// function onClick(e) {
//     console.log(e.target);
// }