const modalCocktail = document.querySelector('.modal-cocktail');
const overlayCocktail = document.querySelector('.overlay');
const btnCloseModalCocktail = document.querySelector('.close-modal-cocktail');
const btnOpenModalCocktail = document.querySelector('.show-modal-cocktail');

const openModalCoctail = function () {
  modalCocktail.classList.remove('hidden');
  overlayCocktail.classList.remove('hidden');
};

const closeModalCoctail = function () {
  modalCocktail.classList.add('hidden');
  overlayCocktail.classList.add('hidden');
};

btnOpenModalCocktail.addEventListener('click', openModalCoctail);

btnCloseModalCocktail.addEventListener('click', closeModalCoctail);
overlayCocktail.addEventListener('click', closeModalCoctail);

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modalCocktail.classList.contains('hidden')) {
    closeModal();
  }
});

console.log("JS page Modal Cockteil")