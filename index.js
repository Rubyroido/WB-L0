import { initialCards } from "./utils/initialCards.js";

const accordionBody = document.querySelector('.accordion__body');
const accordionBodyUnavailable = document.querySelector('.accordion__body-unavailable');
const cardTemplate = document.querySelector('#item-template');
const unavailableTemplate = document.querySelector('#unavailable-template');


window.addEventListener('click', (event) => {
  if (event.target.className !== 'accordion__header') {
    return
  } else {
    const accordion = event.target.parentNode;
    const currentAccordion = accordion.querySelector('.accordion__body');
    const accordionButton = accordion.querySelector('.accordion__icon');

    currentAccordion.classList.toggle('accordion__body_inactive');
    accordionButton.classList.toggle('accordion__icon_active');
  }
})

function createCard(item) {
  const card = cardTemplate.content.querySelector('.accordion__item').cloneNode(true);

  card.querySelector('.custom-checkbox__button').id = `toggle${item.index}`;
  card.querySelector('.custom-checkbox__label').htmlFor = `toggle${item.index}`;

  const cardImage = card.querySelector('.accordion__item-img');
  cardImage.src = item.image;
  cardImage.alt = item.name;

  card.querySelector('.accordion__item-name').textContent = item.name;
  if (item.color !== null) {
    card.querySelector('.accordion__item-color').textContent = `Цвет: ${item.color}`;
  }
  if (item.size !== null) {
    card.querySelector('.accordion__item-size').textContent = `Размер: ${item.size}`;
  }
  card.querySelector('.accordion__item-storage').textContent = item.storage;
  card.querySelector('.accordion__item-seller').textContent = item.seller;

  const cardValue = card.querySelector('.accordion__item-value');
  cardValue.textContent = item.value;

  if (item.stock <= 5) {
    card.querySelector('.accordion__item-stock').textContent = `Осталось ${item.stock} шт`;
  }

  const cardCost = card.querySelector('.accordion__item-cost');
  const cardDiscount = card.querySelector('.accordion__item-discount');

  let totalCost = item.price * item.value;
  let discountedCost = totalCost - (totalCost * item.discount);
  let result = discountedCost.toLocaleString();
  cardCost.textContent = `${result} сом`;
  cardDiscount.textContent = `${totalCost} сом`;

  return card;
}

function createUnavailableCard(item) {
  const card = unavailableTemplate.content.querySelector('.accordion__item').cloneNode(true);
  const cardImage = card.querySelector('.accordion__item-img');
  cardImage.src = item.image;
  cardImage.alt = item.name;

  card.querySelector('.accordion__item-name').textContent = item.name;
  if (item.color !== null) {
    card.querySelector('.accordion__item-color').textContent = `Цвет: ${item.color}`;
  }
  if (item.size !== null) {
    card.querySelector('.accordion__item-size').textContent = `Размер: ${item.size}`;
  }

  return card;
}

const cards = initialCards.map((item) => {
  return createCard(item);
})

const unavailableCards = initialCards.map((item) => {
  return createUnavailableCard(item);
})

accordionBody.append(...cards);
accordionBodyUnavailable.append(...unavailableCards);

const commonCheckbox = document.querySelector('.accordion__checkbox');
const commonCheckboxButton = commonCheckbox.querySelector('.custom-checkbox__button');
const basketCheckboxes = Array.from(accordionBody.querySelectorAll('.custom-checkbox__button'));

commonCheckboxButton.addEventListener('change', (event) => {
  if(event.target.checked) {
    basketCheckboxes.forEach((checkbox)=> {
      checkbox.checked = true;
    })
  } else {
    basketCheckboxes.forEach((checkbox)=> {
      checkbox.checked = false;
    })
  }
})
