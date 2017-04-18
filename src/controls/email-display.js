'use strict';

module.exports = {
  build: function() {
    return document.createElement('a');
  },
  update: function(elem, value) {
    elem.href = 'mailto:' + value;
    elem.textContent = value;
  }
};
