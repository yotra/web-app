/** @module */

'use strict';

module.exports = function(props, doc) {
  const elem = doc.createElement('input');
  elem.type = 'date';
  // elem.placeholder = 'dd.mm.yyyy';
  // TODO: manual input later
  // https://github.com/dbushell/Pikaday/issues/520
  elem.readOnly = true;
  // TODO: load min and max from other DOM elements
  //    console.log('picker is created');
  // };

  return elem;
};
