import {point, localStorageArr } from './refs.js';
import { saveInLocalStorage } from './global-functions.js'; 
import { openModalCoctail } from './modal-cocktail.js';
import { modalMarkupCocktail } from './modal-cocktail.js';
// ADD To and Remove cards to Favorites //
point.galleryUl.addEventListener('click', addToFavorite );

export let learnId = 0;
async function addToFavorite(e) {
    if (e.target.textContent === 'Learn More') {
       learnId = parseInt(e.target.nextSibling.nextSibling.attributes[1].nodeValue.match(/\d+/g));

        console.log(learnId);
        openModalCoctail();
        await modalMarkupCocktail();

    } else {
        const element = e.target.children[1].textContent;
      

        if (/^\d{5}$/.test(element) || /^\d{6}$/.test(element)) {
            if (!localStorageArr.includes(element)) {
                localStorageArr.push(element);

            } else {
                const index = localStorageArr.indexOf(element);
                if (index > -1) {
                    localStorageArr.splice(index, 1);
                }
            }
            saveInLocalStorage('CoctailsId', localStorageArr);
        }
        e.target.innerHTML = `<div> ${localStorageArr.includes(element) ? `Remove` : `Add to`}
    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 19L8.9775 17.6332C3.57 12.7978 0 9.60872 0 5.69482C0 2.50572 2.541 0 5.775 0C7.602 0 9.3555 0.838692 10.5 2.16403C11.6445 0.838692 13.398 0 15.225 0C18.459 0 21 2.50572 21 5.69482C21 9.60872 17.43 12.7978 12.0225 17.6436L10.5 19Z" fill="#FD5103"/>
${localStorageArr.includes(element) ? '' : `<path d="M10.5 17L9.2675 15.921C4.89 12.1035 2 9.58583 2 6.49591C2 3.9782 4.057 2 6.675 2C8.154 2 9.5735 2.66213 10.5 3.70845C11.4265 2.66213 12.846 2 14.325 2C16.943 2 19 3.9782 19 6.49591C19 9.58583 16.11 12.1035 11.7325 15.9292L10.5 17Z" fill="#FCFCFC"/>`
            }</svg>
<div class="coctailsId visually-hidden">${element}</div></div>`;
    }
}

function removeFromFavorite(e) {
    localStorageArr.filter(
    coctailId => coctailId !== e.target.children[1].textContent
    );
    saveInLocalStorage('CoctailsId', localStorageArr);
}