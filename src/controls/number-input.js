/** Pick any number between min and max */

'use strict';

module.exports = function(props, doc) {
  var elem = doc.createElement('input');
  elem.type = 'number';
  elem.placeholder = 'Число';
  return elem;
};
