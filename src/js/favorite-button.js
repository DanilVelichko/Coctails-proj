import { refs, fetchEl, point, counter } from './refs.js';
import { saveInLocalStorage, loadFromLocalStorage } from './global-functions.js';

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

console.log('Favorite button js');

export function addToFavorite(e) {
    console.log('Click')
   saveInLocalStorage('CoctailsId', '1');
   
    console.dir(e.target);

}

export const removeFavorite = () => {

};