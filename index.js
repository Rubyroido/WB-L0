import { initialCards } from "./utils/initialCards.js";

const accordionBody = document.querySelector('.accordion__body')
const cardTemplate = document.querySelector('#item-template');

function createCard(item) {
  const card = cardTemplate.content.querySelector('.accordion__item').cloneNode(true);
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
  cardCost.textContent = `${discountedCost} сом`;
  cardDiscount.textContent = `${totalCost} сом`;

  return card;
}

const cards = initialCards.map((item) => {
  return createCard(item);
})

accordionBody.append(...cards);
