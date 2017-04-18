/**
 * Set property value: input or display
 */

'use strict';

const DateDisplay = require('./date-display');
const UrlDisplay = require('./url-display');
const UrlIdDisplay = require('./urlid-display');
const TelephoneDisplay = require('./telephone-display');
const EmailDisplay = require('./email-display');
const ImageDisplay = require('./image-display');
const BooleanDisplay = require('./boolean-display');

const reselectOptions = function(elem, value) {
  const options = elem.children;
  for (let i = options.length - 1; i >= 0; i -= 1) {
    const needOption = options[i];
    // setAttribute for static html
    if (needOption.value === value) {
      needOption.setAttribute('selected', 'selected');
    } else {
      needOption.removeAttribute('selected');
    }
  }
};

/**
 * Установка значения элемента
 * Преобразование исходного типа в тип элемента (строка или чекбокс)
 * value - for inputs
 * textContent - for readable properties
 * По сути является полифиллом для elem.setTypedValue -
 *   установкой типизированного значения (не строки) в элемент
 */
const setInputValue = function(elemInput, value) {
  // no-param-reassign
  const elem = elemInput;

  if (value === undefined) {
    throw new Error('value_can_not_be_undefined');
  }

  switch (elem.type) {
    case 'checkbox':
      elem.checked = value; // null or false or true
      if (value === true) {
        elem.setAttribute('checked', 'checked');
        // default value in some browsers
        elem.setAttribute('value', 'on');
      } else {
        elem.removeAttribute('checked');
        elem.removeAttribute('value');
      }
      break;
    case 'select-one':
      // Attribute value not allowed on element select at this point
      elem.value = value === null ? '' : value;
      reselectOptions(elem, value);
      break;
    default:
      elem.value = value === null ? '' : value;
      if (value !== null) {
        elem.setAttribute('value', value);
      } else {
        elem.removeAttribute('value');
      }
  }

  // debugging
  elem.title = String(value);
};

const setDisplayValue = function(elemDisplay, value) {
  const elem = elemDisplay;

  if (value === undefined) {
    throw new Error('value_can_not_be_undefined');
  }

  const schemaType = elem.getAttribute('data-schema-type');

  if (!schemaType) {
    throw new Error('required_data-schema-type');
  }

  switch (schemaType) {
    case 'URL':
      UrlDisplay.update(elem, value);
      return;
    case 'URLID':
      UrlIdDisplay.update(elem, value);
      return;
    case 'Telephone':
      TelephoneDisplay.update(elem, value);
      return;
    case 'Email':
      EmailDisplay.update(elem, value);
      return;
    case 'Image':
      ImageDisplay.update(elem, value);
      return;
    case 'Boolean':
      BooleanDisplay.update(elem, value);
      return;
    case 'Date':
      DateDisplay.update(elem, value);
      return;
    default:
      elem.textContent = value === null ? '' : (value + '');
      // TODO debugging
      elem.title = String(value);
  }
};

module.exports = {
  setInputValue: setInputValue,
  setDisplayValue: setDisplayValue
};

/**
 * HTML контрол при каждом событии генерирует нужные данные
 * Например <input type="number" class="integer-input />
 * является по сути <integer-input />
 * который на выходе должен выдавать целое число,
 * а также выдавать базовую ошибку, если введено нецелое число или строка
 * Изначально элемент содержит только базовую логику, объявленную браузером, например проверка чисел, дат, а также генерация событий. То есть HTML разметка уже сама по себе содержит логику (без дополнительных скриптов)
 * Данный полифилл добавляет более гибкую логику элементам ввода.
 *
 * Обновление также может быть и по кнопке UPDATE - явный вызов
 * - слушать событие клик на соответствующих кнопках
 */

/**
 * Событие вставки новых записей.
 * Три вида кнопок: обновление, удаление, добавление
 * - события клик на соответствующих кнопках
 * В итоге инициируется новое сообщение
 * - название сущности (пути)
 * - новый элемент (созданный или выбранный)
 */
// const registerInsert = function(rootElem) {
//   rootElem.addEventListener('click', function(e) {
//     const elem = e.target;

//     // <form new-record></form>
//     // `<button data-method="insert-item"
//     //          data-entity="policy.countries"
//     //          data-entity-form="some-form-of-new-record"
//     // `;

//     // `<button data-method="remove-item"
//     //          data-entity="policy.countries"
//     //          data-entity-id="usa"
//     // `;

//     const event = new CustomEvent('insertItem', {
//       detail: result,
//       bubbles: true
//     });

//     elem.dispatchEvent(event);
//   });
// };
