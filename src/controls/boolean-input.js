/** Checkbox */

'use strict';

module.exports = function(props, doc) {
  const elem = doc.createElement('input');
  elem.type = 'checkbox';

  setTimeout(function() {
    const div = doc.createElement('div');
    div.appendChild(doc.createElement('div'));
    elem.parentNode.insertBefore(div, elem.nextSibling);
  }, 0);

  return elem;
};
