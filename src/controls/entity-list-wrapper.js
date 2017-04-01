'use strict';

// const microdata = require('./helpers/microdata');
const SEPAR = '__';

module.exports = {
  updateItems: function(elemSection, entityList, entitySchema, pathLevels, typeCheckers, buildEntityElem) {
    if (!elemSection) {
      throw new Error('required_elemSection');
    }

    // must be array
    if (!entityList || Array.isArray(entityList) === false) {
      throw new Error('required_entityList_array');
    }

    const allPathLevels = ['root'].concat(pathLevels);

    const ids = entityList.map(function(entity) {
      return allPathLevels.concat(entity.id).join(SEPAR) + '_content';
    });

    const currentElems = elemSection.children;

    // delete excessive
    for (let i = currentElems.length - 1; i >= 0; i -= 1) {
      const needElem = currentElems[i];

      if (ids.indexOf(needElem.id) < 0) {
        elemSection.removeChild(needElem);
      }
    }

    // update or insert
    // TODO: index -> position
    entityList.forEach(function(entity) {
      if (!entity) {
        throw new Error('required_entity');
      }

      const entityPathLevels = pathLevels.concat(entity.id);

      const elemEntity = buildEntityElem(elemSection,
                                         entityPathLevels,
                                         entitySchema,
                                         entity,
                                         typeCheckers);

      const btn = elemEntity.querySelector('[data-action="removeItem"][data-entity-list-path="' + pathLevels.join('.') + '"]');

      if (!btn) {
        // TODO: if not exists
        const buttonRemoveItem = document.createElement('button');
        buttonRemoveItem.textContent = 'X';
        buttonRemoveItem.type = 'button';
        buttonRemoveItem.setAttribute('data-action', 'removeItem');
        buttonRemoveItem.setAttribute('data-entity-oid', JSON.stringify({ id: entity.id }));
        buttonRemoveItem.setAttribute('data-entity-list-path', pathLevels.join('.'));
        elemEntity.appendChild(buttonRemoveItem);
      }
    });
  }
};
