import { refs } from './refs';

headerInit();

function headerInit() {
  refs.backdropMenu.addEventListener('mouseleave', () => {
    refs.menu.classList.remove('active');
  });
  refs.backdropMenu.addEventListener('mouseenter', () => {
    refs.menu.classList.add('active');
  });
  
  refs.refBurgerIcon.addEventListener('click', () => {
    mobileToggle();
    refs.refBurgerClose.addEventListener('click', closeAndClear);
  });
}

// Burger menu
function mobileToggle() {
  refs.refBurgerNav.classList.toggle('open');
  refs.refSearchForm.classList.toggle('open');
  refs.refBackdropMobile.classList.toggle('open');
}

function closeAndClear() {
  mobileToggle();
  refs.refBurgerClose.removeEventListener('click', closeAndClear);
}

export function closeMobileMenu() {
  refs.menu?.classList.remove('active');
}
