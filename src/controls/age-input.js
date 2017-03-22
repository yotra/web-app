/** Pick any integer between min and max age */

'use strict';

/**
 * @param {Number} props.value Number or null
 */
module.exports = function(props, doc) {
  const elem = doc.createElement('input');
  elem.type = 'number';
  elem.placeholder = 'лет';
  return elem;
};
