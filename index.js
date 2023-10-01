import { initialCards } from "./utils/initialCards.js";
import { paymentCards } from "./utils/paymentCards.js";
import { adresses } from "./utils/adresses.js";

// блоки для темплейтов
const accordionBody = document.querySelector('.accordion__body');
const accordionBodyUnavailable = document.querySelector('.accordion__body-unavailable');
const paymentCardsPopup = document.querySelector('.popup-payment__cards');
const deliveryOptionsPopup = document.querySelector('.popup-delivery__options')

// темплейты
const cardTemplate = document.querySelector('#item-template');
const unavailableTemplate = document.querySelector('#unavailable-template');
const paymentCardTemplate = document.querySelector('#card-template');
const adressTemplate = document.querySelector('#delivery-template');

// слушатель для открытия и закрытия аккордеонов
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

// функция создания карточки из темплейта
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

const cards = initialCards.map((item) => {
  return createCard(item);
})

accordionBody.append(...cards);

// функция создания недоступной карточки из темплейта
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

const unavailableCards = initialCards.map((item) => {
  return createUnavailableCard(item);
})

accordionBodyUnavailable.append(...unavailableCards);

// функция создания вариантов выбора в попапе оплаты
function createPaymentCard(card) {
  const paymentCard = paymentCardTemplate.content.querySelector('.popup-payment__card').cloneNode(true);
  const paymentCardLogo = paymentCard.querySelector('.popup-payment__card-img')
  paymentCardLogo.src = card.img;
  paymentCardLogo.alt = card.type;
  paymentCard.querySelector('.popup-payment__card-number').textContent = card.number;
  const paymentCardButton = paymentCard.querySelector('.custom-radio__button');
  paymentCardButton.value = card.type;
  paymentCardButton.id = `${card.type}`;
  paymentCard.querySelector('.custom-radio__label').htmlFor = `${card.type}`;
  return paymentCard;
}

const createdPaymentCards = paymentCards.map((card) => {
  return createPaymentCard(card);
})

paymentCardsPopup.append(...createdPaymentCards);

// функция создания вариантов выбора в попапе доставки
function createAdress(item) {
  const deliveryAdress = adressTemplate.content.querySelector('.popup-delivery__option').cloneNode(true);
  deliveryAdress.querySelector('.popup-delivery__adress').textContent = item.adress;

  const adressButton = deliveryAdress.querySelector('.custom-radio__button');
  adressButton.value = item.index;
  adressButton.id = `adress${item.index}`;
  deliveryAdress.querySelector('.custom-radio__label').htmlFor = `adress${item.index}`;

  return deliveryAdress;
}

const createdAdresses = adresses.map((adress) => {
  return createAdress(adress);
})

deliveryOptionsPopup.append(...createdAdresses);

const popup = document.querySelector('.popup');
const paymentButtonChange = document.querySelector('.payment__header-button');
const deliveryButtonChange = document.querySelector('.delivery__header-button');
const paymentPopup = document.querySelector('.popup-payment');
const deliveryPopup = document.querySelector('.popup-delivery');
const paymentButtonClose = paymentPopup.querySelector('.popup-payment__close');
const paymentButtonSubmit = paymentPopup.querySelector('.popup-payment__submit');
const deliveryButtonClose = deliveryPopup.querySelector('.popup-delivery__close');
const deliveryButtonSubmit = deliveryPopup.querySelector('.popup-delivery__submit');

// обработка открытия и закрытия попапов
function closeOnOverlay(event) {
  if (event.target.classList.contains('popup-payment') || event.target.classList.contains('popup-delivery')) {
    togglePopup();
    paymentPopup.close();
    deliveryPopup.close();
  }
}

function togglePopup() {
  popup.classList.toggle('popup_active');
  if (popup.classList.contains('popup_active')) {
    popup.addEventListener('click', closeOnOverlay)
  } else {
    removeEventListener('click', closeOnOverlay)
  }
}

paymentButtonChange.addEventListener('click', () => {
  togglePopup();
  paymentPopup.showModal();
})
paymentButtonClose.addEventListener('click', () => {
  togglePopup();
  paymentPopup.close();
})
paymentButtonSubmit.addEventListener('click', () => {
  togglePopup();
})

deliveryButtonChange.addEventListener('click', () => {
  togglePopup();
  deliveryPopup.showModal();
})
deliveryButtonClose.addEventListener('click', () => {
  togglePopup();
  deliveryPopup.close();
})
deliveryButtonSubmit.addEventListener('click', () => {
  togglePopup();
})
// Обработка общего чекбокса
const commonCheckbox = document.querySelector('.accordion__checkbox');
const commonCheckboxButton = commonCheckbox.querySelector('.custom-checkbox__button');
const basketCheckboxes = Array.from(accordionBody.querySelectorAll('.custom-checkbox__button'));

commonCheckboxButton.addEventListener('change', (event) => {
  if (event.target.checked) {
    basketCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    })
  } else {
    basketCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    })
  }
})


