/**
 Обёртка для свойства. Содержит:
 - элемент с названием свойства
 - элемент с контентом свойства
 - элемент, скрывающий/отображающий элемент с контентом свойства
*/

'use strict';

module.exports = function(rowId) {
  const row = document.createElement('fieldset');
  row.id = rowId;
  row.className = 'prop-row';

  const elemSwitch = document.createElement('input');
  elemSwitch.type = 'radio';
  elemSwitch.name = 'tabview';
  elemSwitch.setAttribute('value', rowId);
  row.appendChild(elemSwitch);

  return row;
};
