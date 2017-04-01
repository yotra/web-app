/** Country input */

'use strict';

module.exports = function(props, doc, typeChecker) {
  const elem = document.createElement('select');
  // elem.type = 'text';
  // elem.placeholder = 'country id';

  const emptyOption = document.createElement('option');
  emptyOption.textContent = 'Выберите страну...';
  emptyOption.value = '';
  elem.appendChild(emptyOption);

  typeChecker.allowed.forEach(function(c) {
    const elemOption = document.createElement('option');
    elemOption.value = c.id;
    elemOption.textContent = c.name;
    elemOption.label = c.name;
    elem.appendChild(elemOption);
  });

  return elem;
};
