/** String input */

'use strict';

module.exports = function(props, doc) {
  const elem = doc.createElement('input');
  elem.type = 'text';
  elem.placeholder = 'text';
  return elem;
};
