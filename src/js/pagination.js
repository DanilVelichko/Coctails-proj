import { refs, fetchEl, point, counter } from './refs.js';
import axios from 'axios';
import { elBtn } from './hero-letters-filter.js';
import { cleanPagination, renderCard, cleanHTML, formatScreenRender, itemsPerScreen } from './global-functions.js';

const pagRefs = {
  api: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  pagesButtons: document.querySelectorAll('.pagination__button'),
  currentPage: 'pagination__button-current',
};



point.paginationDiv.addEventListener('click', async function goToPage(e) {

e.target.classList.add("pagination__button-current");
  const pageNum = (e.target.textContent - 1);
  
    // Смотрим на размер окна и считаем размер страницы //
    const itemsPerPage = itemsPerScreen();
 
    // Забираем обьект с сервера. В нем 25 коктейлей, сохраняем в массив //
    try {
      const response = await axios.get(`${pagRefs.api}${elBtn}`);
      const responseArr = response.data.drinks;
      console.log("Все коктейли в одном массиве: ", responseArr);

      // Разделяем большой массив на массивы постранично исходя из разрешения экрана //
      const pagesArr = await paginate(responseArr, itemsPerPage);
      console.log('Здесь страницы с коктейлями на каждой:', pagesArr);

      cleanHTML();

      // Рендерим на страницу по клику на соответсвующую кнопку//
      point.galleryUl
        .insertAdjacentHTML('beforeend', pagesArr[pageNum].map(item => renderCard(item)).join(''));
      
    } catch (error) {
      console.dir(error);
    }

    // чистим и снова рендерим пагинацию //
    // await cleanPagination();
    let paginationGoToPage = await createPagination(elBtn);
  point.paginationDiv.innerHTML = paginationGoToPage;
  
 
  // находим класс current на прежней кнопке, снимаем его и ставим этот клас на кликнутую кнопку
  await doCurrentClass(e);

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
 
  // Добавляем количество кнопок страниц до 6, исходя из макета

  if (totalPages <= 6) {
    for (let k = 1; k <= totalPages; k++) {
    pagination += '<button class="pagination__button" ';
    if (k === currentPage) {
      pagination += ' class="pagination__button-current" ';
    }
    pagination += '>' + k + '</button>';
  }
  }

  // Если страниц будет больше 6, то появляется разделитель '...' первых трех и последних трехстраниц
  if (totalPages > 7) {
    // Добавляем первые три кнопки страниц //
    for (let k = 1; k <= 3; k++) {
    pagination += '<button class="pagination__button"';
    if (k === currentPage) {
      pagination += ' class="pagination__button-current" ';
    }
    pagination += '>' + k + '</button>';
    }
    console.log('Hello');
     // Добавляем троеточие между кнопками страниц //
    pagination += '<div class="pagination_points">...</div>';

    // Добавляем последние три кнопки страниц //
    counterTotalPages = (totalPages - 2);
    for (let j = totalPages; j > (totalPages - 3); j -= 1) {
      
       pagination += '<button class="pagination__button" >'+ counterTotalPages +'</button>';
     
       if (j === currentPage) {
      pagination += ' class="pagination__button-current" ';
      }
      counterTotalPages += 1;
     }
  }


  return pagination;
}
async function doCurrentClass(e) {
    // pagRefs.pagesButtons.classList.remove("pagination__button-current");
        console.log('Класс',  e.target);
        e.target.classList.add("pagination__button-current");
}



console.log('Подключена страница Pagination');