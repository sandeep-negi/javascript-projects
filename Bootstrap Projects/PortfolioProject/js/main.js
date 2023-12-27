/* Header Scroll */
let nav = document.querySelector('.navbar');
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add('header-scrolled');
  } else {
    nav.classList.remove('header-scrolled');
  }
}

/* Nav Hide in mobile view */
let navbar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navbar.forEach((x) => {
  x.addEventListener('click', () => {
    navCollapse.classList.remove('show');
  })
})