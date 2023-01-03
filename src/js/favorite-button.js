import { refs, fetchEl, point, counter } from './refs.js';

window.addEventListener('load', init);

function init(){
    point.galleryUl.point.card.forEach( card => {
        card.addEventListener('click', clickhandler );
    });
}
point.addFavoriteButtons.addEventListener('click', addToFavorite);

console.log('Favorite js')
export function addToFavorite(e) {
    console.log('Click')
   localStorage.setItem('CoctailsId', '1');
   
    console.dir(e.target);

}

export const removeFavorite = () => {

};