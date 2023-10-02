function showError(inputElement, errorMessage) {
  const errorElement = inputElement.parentElement.querySelector('.user-data__error');
  inputElement.classList.add('user-data__input_invalid');
  errorElement.textContent = errorMessage;
}

function hideError(inputElement) {
  const errorElement = inputElement.parentElement.querySelector('.user-data__error');
  inputElement.classList.remove('user-data__input_invalid');
  errorElement.textContent = '';
}

function validateName(inputElement, onSubmission = false) {
  if (onSubmission && inputElement.value.trim() === '') {
    showError(inputElement, 'Введите имя');
  } else if (!onSubmission && inputElement.value.trim() !== '' && !/^[A-Za-z]+$/.test(inputElement.value.trim())) {
    showError(inputElement, 'Введите корректное имя');
  } else {
    hideError(inputElement);
  }
}

function validateSurname(inputElement, onSubmission = false) {
  if (onSubmission && inputElement.value.trim() === '') {
    showError(inputElement, 'Введите фамилию');
  } else if (!onSubmission && inputElement.value.trim() !== '' && !/^[A-Za-z]+$/.test(inputElement.value.trim())) {
    showError(inputElement, 'Введите корректную фамилию');
  } else {
    hideError(inputElement);
  }
}

function validateEmail(inputElement, onSubmission = false) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (onSubmission && inputElement.value.trim() === '') {
    showError(inputElement, 'Введите адрес электронной почты');
  } else if (!onSubmission && inputElement.value.trim() !== '' && !emailRegex.test(inputElement.value.trim())) {
    showError(inputElement, 'Введите корректный адрес электронной почты');
  } else {
    hideError(inputElement);
  }
}

function validatePhone(inputElement, onSubmission = false) {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (onSubmission && inputElement.value.trim() === '') {
    showError(inputElement, 'Введите номер телефона (Формат: +9 999 999 99 99)');
  } else if (!onSubmission && inputElement.value.trim() !== '' && !phoneRegex.test(inputElement.value.trim())) {
    showError(inputElement, 'Введите корректный номер телефона (Формат: +9 999 999 99 99)');
  } else {
    hideError(inputElement);
  }
}

function validateITN(inputElement, onSubmission = false) {
  const itnRegex = /^\d{14}$/;

  if (onSubmission && inputElement.value.trim() === '') {
    showError(inputElement, 'Введите ИНН');
  } else if (!onSubmission && inputElement.value.trim() !== '' && !itnRegex.test(inputElement.value.trim())) {
    showError(inputElement, 'Введите корректный ИНН');
  } else {
    hideError(inputElement);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const inputList = Array.from(document.querySelectorAll('.user-data__input'));

  inputList.forEach((inputElement) => {
    switch (inputElement.name) {
      case 'name':
        validateName(inputElement, true);
        break;
      case 'surname':
        validateSurname(inputElement, true);
        break;
      case 'email':
        validateEmail(inputElement, true);
        break;
      case 'phone':
        validatePhone(inputElement, true);
        break;
      case 'itn':
        validateITN(inputElement, true);
        break;
      default:
        break;
    }
  });
}

function setupEventListeners() {
  const inputList = Array.from(document.querySelectorAll('.user-data__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      switch (inputElement.name) {
        case 'name':
          validateName(inputElement);
          break;
        case 'surname':
          validateSurname(inputElement);
          break;
        case 'email':
          validateEmail(inputElement);
          break;
        case 'phone':
          validatePhone(inputElement);
          break;
        case 'itn':
          validateITN(inputElement);
          break;
        default:
          break;
      }
    });
  });

  const formElement = document.querySelector('.user-data');
  formElement.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
