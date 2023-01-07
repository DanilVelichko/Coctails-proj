import { refs } from './refs';

(function headerInit() {
  refs.backdropMenu.addEventListener('mouseleave', () => {
    refs.menuSecondRow.classList.remove('active');
  });

  refs.backdropMenu.addEventListener('mouseenter', () => {
    refs.menuSecondRow.classList.add('active');
  });

  refs.mobileMenuBurger?.addEventListener('click', closeMobileMenu);

  // Burger menu

  document.querySelector('.burger__btn').addEventListener('click', () => {
    document.querySelector('.nav-mobile__burger').classList.add('open');
  });

  document.querySelector('.burger__close').addEventListener('click', () => {
    document.querySelector('.nav-mobile__burger').classList.remove('open');
  });

  // refs.refHeaderMenuClose.addEventListener('click', closeMobileMenu);
})();

export function closeMobileMenu() {
  refs.menuSecondRow?.classList.remove('active');
  //   refs.refHeaderMobMenu.classList.toggle('open');
  //   refs.refHeaderSwitcher.classList.toggle('open');
  //   document.querySelector('.header__search').classList.toggle('open');
  //   document.querySelector('.header__nav-desktop').classList.toggle('open');
  //   document.body.classList.toggle('overflow');
}
