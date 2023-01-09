import axios from 'axios';
import debounce from 'debounce';
import {
  renderCard,
  formatScreenRenderGallery,
  cleanHTML,
  saveInLocalStorage,
  loadFromLocalStorageGlobal,
} from './global-functions.js';
import { refs, fetchEl, point, counter, localStorageArr } from './refs.js';

const debouncedRender = debounce(() => formatScreenRenderGallery(galleryMarkup), 1000);

export async function galleryMarkup() {
  cleanHTML();
  try {
    const response = await axios.get(refs.randomCoctailApi);
    point.galleryUl.insertAdjacentHTML(
      'beforeend',
      renderCard(response.data.drinks[0])
    );
  } catch (error) {
    console.dir(error);
  }
}

formatScreenRenderGallery(galleryMarkup)
window.addEventListener('resize', debouncedRender);

console.log('Подключена страница  Gallery js');
