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
    card.querySelector('.accordion__item-size-mob').textContent = item.size;
  } else {
    card.querySelector('.accordion__item-size-mob').classList.add('accordion__item-size-mob_inactive');
  }
  card.querySelector('.accordion__item-storage').textContent = item.storage;
  card.querySelector('.accordion__item-seller').textContent = item.seller.name;
  card.querySelector('.accordion__tooltip-name').textContent = item.seller.name;
  card.querySelector('.accordion__tooltip-number').textContent = item.seller.registration;
  card.querySelector('.accordion__tooltip-adress').textContent = item.seller.adress;

  const cardTooltip = card.querySelector('.accordion__item-hint');
  cardTooltip.addEventListener('mouseover', () => {
    card.querySelector('.accordion__tooltip').classList.toggle('accordion__tooltip_active');
  })
  cardTooltip.addEventListener('mouseout', () => {
    card.querySelector('.accordion__tooltip').classList.toggle('accordion__tooltip_active');
  })

  let cardValue = card.querySelector('.accordion__item-value');
  cardValue.value = item.value;
  card.querySelector('.max-value').value = item.stock;

  card.querySelector('.accordion__item-price').value = item.price;
  card.querySelector('.accordion__item-discounted').value = item.discount;

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
    card.querySelector('.accordion__item-size-mob').textContent = item.size;
  } else {
    card.querySelector('.accordion__item-size-mob').classList.add('accordion__item-size-mob_inactive');
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

// обработка открытия и закрытия попапов
const popup = document.querySelector('.popup');
const paymentButtonChange = document.querySelector('.payment__header-button');
const deliveryButtonChange = document.querySelector('.delivery__header-button');
const basketDeliveryButtonChange = document.querySelector('.basket__delivery-edit');
const basketPaymentButtonChange = document.querySelector('.basket__payment-edit');
const paymentPopup = document.querySelector('.popup-payment');
const deliveryPopup = document.querySelector('.popup-delivery');
const paymentButtonClose = paymentPopup.querySelector('.popup-payment__close');
const paymentButtonSubmit = paymentPopup.querySelector('.popup-payment__submit');
const deliveryButtonClose = deliveryPopup.querySelector('.popup-delivery__close');
const deliveryButtonSubmit = deliveryPopup.querySelector('.popup-delivery__submit');

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

// слушатели для попапа оплпаты
basketPaymentButtonChange.addEventListener('click', () => {
  togglePopup();
  paymentPopup.showModal();
})
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

// слушатели для попапа доставки
basketDeliveryButtonChange.addEventListener('click', () => {
  togglePopup();
  deliveryPopup.showModal();
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

//обработка сабимтов форм
const paymentForm = document.querySelector('.popup-payment__form');
const deliveryForm = document.querySelector('.popup-delivery__form');

deliveryForm.addEventListener('submit', () => {
  const adressValue = document.querySelector('input[name="input-data"]:checked').value;
  const adressData = adresses.find((adress) => {
    return adress.index === Number(adressValue);
  })

  document.querySelector('.delivery__adress-text').textContent = adressData.adress;

  document.querySelector('.basket__form-adress').textContent = adressData.adress;
})

paymentForm.addEventListener('submit', () => {
  const cardValue = paymentForm.querySelector('input[name="input-data"]:checked').value;
  const cardData = paymentCards.find((card) => {
    return card.type === cardValue;
  })
  document.querySelector('.basket__form-card-logo').src = cardData.img;
  document.querySelector('.basket__form-card-logo').alt = cardData.type;
  document.querySelector('.basket__form-card-number').textContent = cardData.number;

  document.querySelector('.payment__card-logo').src = cardData.img;
  document.querySelector('.payment__card-logo').alt = cardData.type;
  document.querySelector('.payment__card-number').textContent = cardData.number;
})

// Обработка общего чекбокса
const commonCheckbox = document.querySelector('.accordion__checkbox');
const commonCheckboxButton = commonCheckbox.querySelector('.custom-checkbox__button');
const basketCheckboxes = Array.from(accordionBody.querySelectorAll('.custom-checkbox__button'));

commonCheckboxButton.addEventListener('change', (event) => {
  if (event.target.checked) {
    basketCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;

      const changeEvent = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(changeEvent);
    })
  } else {
    basketCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;

      const changeEvent = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(changeEvent);
    })
  }
})

//каунтеры и стоимость товаров
const basket = document.querySelector('.basket__items-list');
const totalSumDiscounted = document.querySelector('.basket__form-total-cost');
const totalQuantity = document.querySelector('.basket__form-goods');
const totalSum = document.querySelector('.basket__form-discounted');
const totalDiscount = document.querySelector('.basket__form-discount');
const goods = Array.from(basket.querySelectorAll('.accordion__item'));
let totalSumCounter = 0;
let totalQuantityCounter = 0;
let totalDiscountCounter = 0;

// изменение кнопки сабмита
const sidebarWithdrawal = document.querySelector('.basket__form-withdrawal');
const sidebarCheckbox = sidebarWithdrawal.querySelector('.basket__form-withdrawal-checkbox');
const sidebarCheckboxHint = sidebarWithdrawal.querySelector('.basket__form-withdrawal-hint');
const sidebarSubmit = document.querySelector('.basket__form-submit');

sidebarCheckbox.addEventListener('change', () => {
  if (sidebarCheckbox.checked) {
    sidebarCheckboxHint.classList.toggle('basket__form-withdrawal-hint_hidden');
    sidebarSubmit.textContent = `Оплатить ${totalSumDiscounted.textContent}`;
  } else {
    sidebarCheckboxHint.classList.toggle('basket__form-withdrawal-hint_hidden');
    sidebarSubmit.textContent = 'Заказать';
  }
})

function updateTotal() {
  totalSum.textContent = `${totalSumCounter} сом`;
  totalQuantity.textContent = `${totalQuantityCounter} товаров`;
  totalDiscount.textContent = `${totalDiscountCounter} сом`;
  totalSumDiscounted.textContent = `${totalSumCounter - totalDiscountCounter} сом`;

  if (sidebarCheckbox.checked === true) {
    sidebarCheckboxHint.classList.add('basket__form-withdrawal-hint_hidden');
    sidebarSubmit.textContent = `Оплатить ${totalSumDiscounted.textContent}`;
  } else {
    sidebarCheckboxHint.classList.remove('basket__form-withdrawal-hint_hidden');
    sidebarSubmit.textContent = 'Заказать';
  }
}
updateTotal();

goods.forEach((item) => {
  const price = item.querySelector('.accordion__item-price').value;
  const discount = item.querySelector('.accordion__item-discounted').value;
  const currentValue = item.querySelector('.accordion__item-value');
  const totalCost = item.querySelector('.accordion__item-discount');
  const totalDiscountedCost = item.querySelector('.accordion__item-cost');
  const checkbox = item.querySelector('.custom-checkbox__button');

  checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked;
    const itemQuantity = Number(currentValue.value);
    const itemPrice = Number(price);
    const itemDiscount = discount;

    if (isChecked) {
      totalSumCounter += itemQuantity * itemPrice;
      totalQuantityCounter += itemQuantity;
      totalDiscountCounter += itemQuantity * itemPrice * itemDiscount;
    } else {
      totalSumCounter -= itemQuantity * itemPrice;
      totalQuantityCounter -= itemQuantity;
      totalDiscountCounter -= itemQuantity * itemPrice * itemDiscount;
    }

    updateTotal();
  });

  const plusButtons = item.querySelector('.accordion__item-increase');
  plusButtons.addEventListener('click', () => {
    const maxValue = Number(item.querySelector('.max-value').value);
    let counter = Number(currentValue.value);
    counter++;

    if (counter > maxValue - 1) {
      plusButtons.disabled = true;
    }

    if (counter !== 0) {
      minusButton.disabled = false;
    }

    currentValue.value = counter;

    let cost = counter * Number(price);
    let discountedCost = cost - (cost * Number(discount));

    totalCost.textContent = `${cost} сом`;
    totalDiscountedCost.textContent = `${discountedCost} сом`;

    if (checkbox.checked) {
      totalSumCounter += Number(price);
      totalQuantityCounter++;
      totalDiscountCounter += Number(price) * discount;

      updateTotal()
    }
  })

  const minusButton = item.querySelector('.accordion__item-decrease');
  minusButton.addEventListener('click', () => {
    const maxValue = Number(item.querySelector('.max-value').value);
    let counter = Number(currentValue.value);
    counter--;

    if (counter < maxValue) {
      plusButtons.disabled = false;
    }

    if (counter === 0) {
      minusButton.disabled = true;
    }

    currentValue.value = counter;

    let cost = counter * Number(price);
    let discountedCost = cost - (cost * Number(discount));

    totalCost.textContent = `${cost} сом`;
    totalDiscountedCost.textContent = `${discountedCost} сом`;

    if (checkbox.checked) {
      totalSumCounter -= Number(price);
      totalQuantityCounter--;
      totalDiscountCounter -= Number(price) * discount;

      updateTotal()
    }
  })
})

// Преобразование инпута номера телефона
let pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
const phoneInput = document.querySelector('input[name="phone"]');
phoneInput.addEventListener('change', (event) => {
  event.preventDefault()
  phoneInput.value = phoneInput.value.replace(pattern, '+7 ($2) $3-$4-$5');
})


