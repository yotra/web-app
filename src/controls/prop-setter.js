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

<<<<<<< HEAD:src/controls/prop-setter.js
=======
const parseImageMeta = function(imageMeta) {
  const parts = imageMeta.split('|');

  if (!parts[0]) {
    throw new Error('required_imageMeta_src');
  }

  const result = {
    src: parts[0]
  };

  for (let i = 1; i < parts.length; i += 1) {
    const keyValue = parts[i].split('=');
    result[keyValue[0]] = keyValue[1];
  }

  return result;
};

// siteUrl=http://asdfasdf.asdf/123|superSite
const parseUrlMeta = function(urlMeta) {
  const parts = urlMeta.split('|');

  if (!parts[0]) {
    throw new Error('required_imageMeta_src');
  }

  const result = {
    href: parts[0]
  };

  if (parts[1]) { result.textContent = parts[1]; }

  return result;
};

const convertIsoDate = function(isoDate) {
  return isoDate.substring(0, 7);
};

>>>>>>> fb26c7d86bbecf71f2525219fcef191b1b6c6798:src/controls/controls-setter.js
const setDisplayValue = function(elemDisplay, value) {
  const elem = elemDisplay;

  if (value === undefined) {
    throw new Error('value_can_not_be_undefined');
  }

  const schemaType = elem.getAttribute('data-schema-type');

<<<<<<< HEAD:src/controls/prop-setter.js
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
=======
    elem.href = urlMeta.href;
    elem.textContent = urlMeta.textContent || urlMeta.href;
  } else if (elem.tagName === 'IMG') {
    if (value === null) {
      throw new Error('image can not be null at this moment');
    }
    const imageMeta = parseImageMeta(value);
    // parse Image string

    elem.src = imageMeta.src;
    if (imageMeta.width) { elem.width = imageMeta.width; }
    if (imageMeta.height) { elem.height = imageMeta.height; }
    if (imageMeta.alt) { elem.alt = imageMeta.alt; }
  } else if (elem.hasAttribute('data-state')) {
    elem.textContent = String(value);
    elem.setAttribute('data-state', String(value));
    // set to wrap
    elem.parentNode.setAttribute('data-state', String(value));
  } else if (elem.getAttribute('data-schema-type') === 'Date') {
    if (value === null) {
      elem.removeAttribute('content');
      elem.textContent = '';
    } else {
      elem.setAttribute('content', value);
      elem.textContent = convertIsoDate(value);
    }
  } else {
    elem.textContent = value === null ? '' : (value + '');
    // TODO debugging
    elem.title = String(value);
>>>>>>> fb26c7d86bbecf71f2525219fcef191b1b6c6798:src/controls/controls-setter.js
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
