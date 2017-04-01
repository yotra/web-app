/** Pick any number between min and max */

'use strict';

module.exports = function(props, doc, typeChecker) {
  var elem = document.createElement('input');
  elem.type = 'number';
  elem.placeholder = 'От ' + typeChecker.min + ' до ' + typeChecker.max;
  elem.min = typeChecker.min;
  elem.max = typeChecker.max;
  return elem;
};
