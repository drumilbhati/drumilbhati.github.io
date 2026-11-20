const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-navigation');
if (header && menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}
