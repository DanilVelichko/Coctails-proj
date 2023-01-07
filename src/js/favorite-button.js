import { refs, fetchEl, point, counter, localStorageArr, favorites } from './refs.js';
import { saveInLocalStorage, loadFromLocalStorage } from './global-functions.js';


// ADD To and Remove cards to Favorites //
point.galleryUl.addEventListener('click', addToFavorite);

function addToFavorite(e) {
    const element = e.target.children[1].textContent;
    if (/^\d{5}$/.test(element)) {

    if (!localStorageArr.includes(element)) {
        localStorageArr.push(element);
        
        console.log("e.target.children[1].textContent", element);
    }  else {
        const index = localStorageArr.indexOf(element);
        if (index > -1) {
            localStorageArr.splice(index, 1);
        }
        
    }
    saveInLocalStorage('CoctailsId', localStorageArr);
}
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