import { refs, fetchEl, point, counter } from './refs.js';
import axios from 'axios';
import { elBtn } from './hero-letters-filter.js';
import { cleanPagination, renderCard, cleanHTML, formatScreenRender, itemsPerScreen } from './global-functions.js';

export const pagRefs = {
  api: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  pagContainer: document.querySelector('.pag-hidden'),
  pagesButtons: document.querySelector('.pagination'),
  pageCounter: 0,
};

point.paginationDiv.addEventListener('click', async function goToPage(e) {
  
    let pageNum = (e.target.textContent - 1);
  
    // Смотрим на размер окна и считаем размер страницы //
    const itemsPerPage = itemsPerScreen();
 
    // Забираем обьект с сервера. В нем 25 коктейлей, сохраняем в массив //
    try {
      const response = await axios.get(`${pagRefs.api}${elBtn}`);
      console.log('Response for Letter: ', response);
      const responseArr = response.data.drinks;
      console.log("Все коктейли в одном массиве: ", responseArr);

      // Разделяем большой массив на массивы постранично исходя из разрешения экрана //
      const pagesArr = await paginate(responseArr, itemsPerPage);
      console.log('Здесь страницы с коктейлями на каждой:', pagesArr);

      // console.log('e.target log', e.target);
      // console.dir('e.target dir', e.target);
      // console.log('e.target.elements log', e.target.elements);
      // console.dir('e.target.elements dir', e.target.elements);
      // console.log('e.target.attributes', e.target.attributes);
      // console.log('e.target.attributes[1]', e.target.attributes[1]); //?
      // console.log('e.target.attributes.length', e.target.attributes.length);

      // Рендерим на страницу по клику на соответсвующую кнопку//
      if (e.target.attributes.length == 1) {
        cleanHTML();
        await doCurrentClass(e);
        point.galleryUl
          .insertAdjacentHTML('beforeend', pagesArr[pageNum].map(item => renderCard(item)).join(''));
        pagRefs.pageCounter = (e.target.textContent - 1);
      }

      // Рендерим по клику на правую стрелку
      else if (e.target.getAttribute('data-custom-attribute') === 'right' && pagRefs.pageCounter != (pagesArr.length - 1)) {
        cleanHTML();
        console.log("Click right arrow");
        console.log('pageCounter до клика на правую кнопку', pagRefs.pageCounter)
        point.galleryUl
          .insertAdjacentHTML('beforeend', pagesArr[(pagRefs.pageCounter + 1)].map(item => renderCard(item)).join(''));
        pagRefs.pageCounter += 1;
        pageNum += pagRefs.pageCounter;
        console.log('pageCounter после клика на правую кнопку', pagRefs.pageCounter);
        // e.target.classList.remove('pagination__button-current');
        // e.target.nextSibling.classList.add("pagination__button-current");

      }
// Рендерим по клику на левую стрелку
      else if (e.target.getAttribute('data-custom-attribute') === 'left' && pagRefs.pageCounter != 0) {
        cleanHTML();
        console.log("Click Left arrow");

        console.log('pageCounter до клика на левую кнопку', pagRefs.pageCounter)
        point.galleryUl
          .insertAdjacentHTML('beforeend', pagesArr[(pagRefs.pageCounter - 1)].map(item => renderCard(item)).join(''));
        pagRefs.pageCounter -= 1;
        pageNum -= pagRefs.pageCounter;
        console.log('pageCounter после клика на левую кнопку', pagRefs.pageCounter);
          }

     // Добавляем выделение текущей страницы и Снимаем класс Текущей страницы со всех кнопок//
      

    } catch (error) {
      console.dir(error);
    }

});


async function paginate(array, itemsPerPage) {
  const totalPages = Math.ceil(array.length / itemsPerPage);
  console.log('Всего страниц этого напитка по этой букве: ', totalPages);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const startIndex = (i - 1) * itemsPerPage;
    const page = array.slice(startIndex, startIndex + itemsPerPage);
    pages.push(page);
  }
  return pages;
}

export async function createPagination(letter) {
  // 
  const itemsPerPage = itemsPerScreen();
  
  const data = await axios.get(`${pagRefs.api}${letter}`);
  // const data = await response.json();
  console.log(data.data.drinks);
  
  const totalResults = data.data.drinks.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  console.log('Total results', totalResults);
  console.log('Totalpages', totalPages); 
  
   return renderPagination(totalPages);
}

function renderPagination(totalPages) {
  let currentPage = 1;
  let pagination = '';
 
// Рендерим левую стрелку

  // Добавляем количество кнопок страниц до 6, исходя из макета
  if (totalPages > 1) {
    if (totalPages <= 6) {
      pagination += `<button class="pagination__arrow-left" data-custom-attribute="left" > <svg id="arrow-icon" class="pagination__button-icon" width="8" height="13" viewBox="0 0 9 13">
<path class="letter" d="M2.90872 6.5L8 11.5558L6.54564 13L0 6.5L6.54564 0L8 1.44422L2.90872 6.5Z"/>
</svg> </button>`;

      for (let k = 1; k <= totalPages; k++) {
        pagination += '<button class="pagination__button ';
        if (k === currentPage) {
          pagination += 'pagination__button-current';
        }
        pagination += '">' + k + '</button>';
      }
    }

    // Если страниц будет больше 6, то появляется разделитель '...' первых трех и последних трехстраниц
    if (totalPages > 7) {
      // Добавляем первые три кнопки страниц //
      for (let k = 1; k <= 3; k++) {
        pagination += '<button class="pagination__button"';
   
        pagination += '>' + k + '</button>';
      }
    
      // Добавляем троеточие между кнопками страниц //
      pagination += '<div class="pagination_points">...</div>';

      // Добавляем последние три кнопки страниц //
      counterTotalPages = (totalPages - 2);
      for (let j = totalPages; j > (totalPages - 3); j -= 1) {
      
        pagination += '<button class="pagination__button" >' + counterTotalPages + '</button>';
     
        if (j === currentPage) {
          pagination += 'pagination__button-current';
        }
        counterTotalPages += 1;
      }
    }

    // Рендерим правую стрелку
    pagination += `<button class="pagination__arrow-right"  data-custom-attribute="right" > <svg class="pagination__button-icon" width="9" height="13" viewBox="0 0 9 13">
<path class="letter" d="M5.31321 6.5L0.221924 1.44422L1.67628 0L8.22192 6.5L1.67628 13L0.221924 11.5558L5.31321 6.5Z"/>
</svg> </button>`;

    return pagination;
  } 
  pagRefs.pagesButtons.classList.add('visually-hidden');
  return `<div class="visually-hidden"></div>`;
} 



export async function doCurrentClass(e) {
  console.log(e.target);
  console.dir(e.target);
     pagRefs.pagesButtons.childNodes.forEach(items => items.classList.remove("pagination__button-current"));
  if (e.target.attributes.length == 1) {
    e.target.classList.add("pagination__button-current");
}  
}

function deletePrevClass(e) {
      e.target.previousSibling.classList.remove("pagination__button-current");
}

 function deleteNextClass(e) {
e.target.nextSibling.classList.add("pagination__button-current"); 
}

console.log('Подключена страница Pagination');