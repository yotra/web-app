/** Pick any number between min and max */

'use strict';

const typeDecade = require('../../../vm-schema').types.Decade;

module.exports = function(props, doc) {
  var elem = doc.createElement('input');
  elem.type = 'number';
  elem.placeholder = 'От ' + typeDecade.min + ' до ' + typeDecade.max;
  elem.min = typeDecade.min;
  elem.max = typeDecade.max;
  return elem;
};
