'use strict';

module.exports = {
  build: function() {
    return document.createElement('a');
  },
  update: function(elem, value) {
    const urlid = value;

    // TODO: add a main host (calculate by js)
    elem.href = '/' + urlid;
    elem.textContent = '/' + urlid;
  }
};
