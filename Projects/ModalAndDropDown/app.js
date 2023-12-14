const modal = document.querySelector('.modal-btn');
const openModal = document.querySelector('#modal');
const closeModal = document.querySelector('#close-modal');

const dropDownContainer = document.querySelector('#dropDown-container');

const countryName = document.querySelector('#country-names');

const allCountryName = document.querySelectorAll('.dd');

const displayName = document.querySelector('#displayName');

modal.addEventListener('mouseenter', () => {
  console.log('mouse over');
  modal.classList.add('btn-clr');
})
modal.addEventListener('mouseout', () => {
  console.log('mouse exit');
  modal.classList.remove('btn-clr');
})
modal.addEventListener('click', () => {
  console.log('clicked modal');
  openModal.classList.remove('d-none');
});

closeModal.addEventListener('click', () => {
  openModal.classList.add('d-none');
})

dropDownContainer.addEventListener('click', (e) => {
  countryName.classList.toggle('d-none');
})

allCountryName.forEach((item) => {
  item.addEventListener('click', (e) => {
    displayName.innerText = item.innerText;
    countryName.classList.add('d-none');
    e.stopPropagation();
  });
});

