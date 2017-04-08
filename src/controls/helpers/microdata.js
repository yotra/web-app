'use strict';

const helper = {};

helper.markEntity = function(entityElem, schemaName) {
  entityElem.setAttribute('itemscope', '');
  entityElem.setAttribute('itemtype', 'http://schema.org/' + schemaName);
};

helper.markProperty = function(propertyElem, propertyName, sameAsPropertyName) {
  // like 'url contentUrl' for images
  const val = propertyName +
        (sameAsPropertyName ? (' ' + sameAsPropertyName) : '');

  propertyElem.setAttribute('itemprop', val);
};

module.exports = helper;
