'use strict';

module.exports = {
  build: function() {
    return document.createElement('a');
  },
  update: function(elem, value) {
    // TODO: telephone format without spaces (link w/o spaces)
    elem.href = 'tel:' + value;
    elem.textContent = value;
  }
};
