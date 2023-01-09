import axios from 'axios';
import { refs, ingredientsLocalStorageArr } from './refs';

export const ingredPoints = {
  source: document.querySelector('.coctails-list'),
  modal: document.querySelector('.modal-ingredients'),
  renderBox: document.querySelector('.flex-container-ingredients'),
  overlay: document.querySelector('.overlay-ingredients'),
  btnCloseModal: document.querySelector('.close-modal-ingredients'),
  btnOpenModal: document.querySelector('.show-modal-ingredients'),

};
export const ingr = {
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
};
export let nameIngredient = '';

export function onIngredient (e){
  // find ingredient name
  for (let key in ingr) {
    if (e.includes(ingr[key])) {
      nameIngredient = ingr[key].toLowerCase();
      // console.log("Название ингредиента >>>", nameIngredient);
    }
  }

  modalMarkupIngredients();
};

export const modalMarkupIngredients = async () => {
  try {
    openModalIngredients();
    const url = await axios.get(`${refs.ingredientApi}${nameIngredient}`);
    ingredPoints.modal.innerHTML = '';
    ingredPoints.modal.insertAdjacentHTML('beforeend', renderModalIngredient(url.data.ingredients[0]));
    
  } catch (error) { 
  }
};

function renderModalIngredient({idIngredient, strIngredient, strDescription, strType, strAlcohol, strABV  }) {
   
  let render = `
      <button class="close-modal-ingredients" style="width: 18px">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.2533 8.99995L17.6221 1.63106C17.7678 1.46101 17.8439 1.24228 17.8352 1.01857C17.8266 0.794855 17.7338 0.582643 17.5755 0.424336C17.4172 0.26603 17.205 0.17329 16.9813 0.164649C16.7576 0.156008 16.5389 0.232102 16.3688 0.377726L8.99992 7.74661L1.63103 0.368837C1.46365 0.201456 1.23663 0.107422 0.999922 0.107422C0.763209 0.107422 0.536192 0.201456 0.368811 0.368837C0.20143 0.536218 0.107396 0.763235 0.107396 0.999948C0.107396 1.23666 0.20143 1.46368 0.368811 1.63106L7.74659 8.99995L0.368811 16.3688C0.27576 16.4485 0.200187 16.5466 0.146833 16.6569C0.0934787 16.7671 0.0634963 16.8873 0.0587679 17.0097C0.0540394 17.1321 0.0746665 17.2542 0.119355 17.3682C0.164044 17.4823 0.231829 17.5859 0.318455 17.6725C0.405082 17.7592 0.508679 17.8269 0.622746 17.8716C0.736813 17.9163 0.858886 17.9369 0.981303 17.9322C1.10372 17.9275 1.22384 17.8975 1.33412 17.8441C1.4444 17.7908 1.54246 17.7152 1.62214 17.6222L8.99992 10.2533L16.3688 17.6222C16.5389 17.7678 16.7576 17.8439 16.9813 17.8352C17.205 17.8266 17.4172 17.7339 17.5755 17.5756C17.7338 17.4173 17.8266 17.205 17.8352 16.9813C17.8439 16.7576 17.7678 16.5389 17.6221 16.3688L10.2533 8.99995Z"
          fill="#202025"
        />
      </svg>
    </button>
    <h1 class="Ingredients-title">${strIngredient}</h1>`;
    
  if (strType) render += `
    <h2 class="Ingredients-type">${strType}</h2>`;
  
  render += ` <div class="Ingredients-line"></div>`;
  
  if (strDescription) {
    if (strDescription.length > 125) {
      render += `
   <p class="Ingredients-description" style="overflow-y: scroll;" >
      ${strDescription}
    </p >`;
    }else {
      render += `
   <p class="Ingredients-description" >
      ${strDescription}
    </p >`;
    }
  } 
  
  if (!strDescription)
    render += `
   <p class="Ingredients-description" >
      There is no description... But we will Googling!! ;) 
    </p >`;
  
  if (strABV)
    render += `
    <ul class="Ingredients-list">
      <li>✶ Alcohol by volume: ${strABV}%</li>
    </ul>`;
    render +=`
    <button type="button" class="Ingredients-button">Add to favorite</button>
`;
  
  return render;
}


const openModalIngredients = function () {
  ingredPoints.modal.classList.remove('hidden');
  ingredPoints.renderBox.classList.remove('hidden');
  ingredPoints.overlay.classList.remove('hidden');
};

const closeModalIngredients = function () {
  ingredPoints.modal.classList.add('hidden');
  ingredPoints.overlay.classList.add('hidden');
  ingredPoints.renderBox.classList.add('hidden');
};

ingredPoints.btnOpenModal.addEventListener('click', openModalIngredients);
ingredPoints.btnCloseModal.addEventListener('click', closeModalIngredients);
ingredPoints.overlay.addEventListener('click', closeModalIngredients);

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !ingredPoints.modal.classList.contains('hidden')) {
    closeModalIngredients();
  }
});