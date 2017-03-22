/**
 * полифилл заменяет стандартный датапикер для соответствующих инпутов. При первой фокусировке - создаётся датапикер.
 * @todo firefox
*/

'use strict';

const Pikaday = require('pikaday');

const i18n = {
  previousMonth : 'Предыдущий месяц',
  nextMonth     : 'Следующий месяц',
  months        : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  weekdays      : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  weekdaysShort : ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
};

const init = function(rootElem) {
  // Добавление полифиллов для элементов,
  // например создание датапикера для соответствующих инпутов
  const replacePicker = function(e) {
    const elem = e.target;
    const microType = elem.getAttribute('data-schema-type');

    if (microType !== 'Date') { return; }

    // hide default datepicker
    // e.preventDefault();

    // console.log('date-input onfocus');

    if (elem.picker) {
      // console.log('already exists');
      // console.dir(elem);
      return;
    }

    elem.picker = new Pikaday({
      field: elem,
      // format: 'YYYY-MM-DD', // 'DD.MM.YYYY',
      firstDay: 1, // Monday
      i18n: i18n,
      yearRange: 2,
      showDaysInNextAndPreviousMonths: false,
      numberOfMonths: 2,
      formatStrict: true
      // container: elem.parentNode,
      // onSelect: function() { const dateString = this.toString(); }
    });

    // TODO: picker.setDate(val);
    // elem.parentNode.insertBefore(picker.el, elem.nextSibling);
  };

  rootElem.addEventListener('focusin', replacePicker);
  rootElem.addEventListener('click', replacePicker);
};

module.exports = {
  init: init
};
