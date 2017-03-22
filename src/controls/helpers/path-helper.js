'use strict';

const calcPathEntity = function(rootEntity, parentPathLevels) {
  let obj = rootEntity;

  // if [] empty then return someState
  parentPathLevels.forEach(function(level) {
    if (obj === undefined) {
      throw new Error('obj_is_undefined');
    }

    // stop by nulls
    if (obj === null) {
      return;
    }

    // if (memberships is Array)
    if (Array.isArray(obj)) {
      // level === item.id
      // find by id
      // 'usa' === 'usa' from 'countries.usa'
      const needItem = obj.filter(function (arrayItem) {
        return (arrayItem.id + '') === (level + '');
      })[0];

      if (!needItem) {
        obj = null;
        console.warn('item_not_found: ' + parentPathLevels.join('.'));
        // TODO: delete subscriptions before DOM elems removals
        return;
      }

      // null or {}
      obj = needItem;

      return;
    }

    obj = obj[level];
  });

  return obj;
};

const helper = {};

/**
 * @param {Object} someState eg: { firstName: 'bar', students: [] }
 * @param {String[]} parentPathLevels ['student'] or ['countries', 'usa']
 * @param {String} propName 'name', 'age', etc.
 * @returns {*} Value for the path
 */
helper.calcPathValue = function(someState, parentPathLevels, propName) {
  const pathEntity = calcPathEntity(someState, parentPathLevels);

  if (!pathEntity) {
    return null;
  }

  return pathEntity[propName];
};

module.exports = helper;
