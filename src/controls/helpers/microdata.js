'use strict';

const helper = {};

helper.markEntity = function(entityElem, schemaName) {
  entityElem.setAttribute('itemscope', '');
  entityElem.setAttribute('itemtype', 'http://schema.org/' + schemaName);
};

helper.markProperty = function(propertyElem, propertyName) {
  propertyElem.setAttribute('itemprop', propertyName);
};

module.exports = helper;
