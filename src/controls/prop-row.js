/**
 Обёртка для свойства. Содержит:
 - элемент с названием свойства
 - элемент с контентом свойства
Дополнительно (на стороне разметки-представления)
 - элемент, скрывающий/отображающий элемент с контентом свойства
*/

'use strict';

module.exports = function(rowId) {
  const row = document.createElement('fieldset');
  row.id = rowId;
  row.className = 'prop-row';
  return row;
};
