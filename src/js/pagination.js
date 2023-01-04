import { refs, fetchEl, point, counter } from './refs.js';
import axios from 'axios';
import { elBtn } from './hero-letters-filter.js';
import { cleanPagination, renderCard, cleanHTML, formatScreenRender, galleryMarkup } from './global-functions.js';

pagRefs = {
  api: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
};

point.paginationDiv.addEventListener('click', goToPage = async (e) => {
  let goToNumberPage = 0;
  goToNumberPage = e.target.textContent;
  console.log(elBtn, goToNumberPage);
  
  // запрашиваем новую страницу по выбранной букве
  await galleryPaginationMarkup(elBtn, goToNumberPage);

  // чистим и снова рендерим пагинацию
  await cleanPagination();
  let paginationGoToPage = await createPagination(elBtn, goToNumberPage);
  point.paginationDiv.innerHTML = paginationGoToPage;
});

async function galleryPaginationMarkup(letter, currentPage) {
  cleanHTML();
 try {
        const response= await axios.get(`${pagRefs.api}${letter}&p=${currentPage}`);

        point.galleryUl
            .insertAdjacentHTML('beforeend', renderCard(response.data.drinks[0]));
      
    } catch (error) {
        console.dir(error);
    }
}

export async function createPagination(letter, currentPage) {
  // 
  let pageSize = 0;
  if (window.matchMedia("(min-width: 1280px)").matches) {
    pageSize = counter.desktop;
  } else if (window.matchMedia("(min-width: 768px)").matches) {
pageSize = counter.tablet;
  } else if (window.matchMedia("(max-width: 480px)").matches) {
pageSize = counter.mobile;
  }
  currentPage = 1;
  const data = await axios.get(`${pagRefs.api}${letter}&p=${currentPage}`);
  // const data = await response.json();
  console.log(data.data.drinks);
  
  const totalResults = data.data.drinks.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  console.log('Total results', totalResults);
  console.log('Totalpages', totalPages);
  
  let pagination = '';
 
  

  // Add page buttons
 
   // Add last three buttons
  if (totalPages <= 6) {
    for (let k = 1; k <= totalPages; k++) {
    pagination += '<button class="pagination__button ';
    if (k === currentPage) {
      pagination += ' class="pagination__button-current" ';
    }
    pagination += '" onclick="goToPage(' + k + ')">' + k + '</button>';
  }
  
  }
  if (totalPages > 7) {
    for (let k = 1; k <= 3; k++) {
    pagination += '<button class="pagination__button" onclick="goToPage(' + k + ')"';
    if (k === currentPage) {
      pagination += ' class="pagination__button-current" ';
    }
    pagination += '>' + k + '</button>';
  }


    pagination += '<div class="pagination_points">...</div>';
    counterTotalPages = (totalPages - 2);
    for (let j = totalPages; j > (totalPages - 3); j -= 1) {
      
       pagination += '<button class="pagination__button" onclick="goToPage(' + counterTotalPages + ')">'+ counterTotalPages +' </button>';
     
       if (j === currentPage) {
      pagination += ' class="pagination__button-current" ';
      }
      counterTotalPages += 1;
     }
  }
 
  return pagination;
}

console.log('Подключена страница Pagination');