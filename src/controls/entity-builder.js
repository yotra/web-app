/**
 * Contains a list of simple inputs, according entity properties
 * @module
 */

'use strict';

const propFactory = require('./prop-factory');
const controlsSetter = require('./controls-setter');
const microdata = require('./helpers/microdata');
const propRow = require('./prop-row');

const entityListWrapper = require('./entity-list-wrapper');

const SEPAR = '__';

const buildInputName = function(parentPathLevels, propName) {
  const levels = parentPathLevels.concat(propName);

  let str = levels[0];

  for (let i = 1; i < levels.length; i += 1) {
    str += '[' + levels[i] + ']';
  }

  return str;
};

const destroyEntityElem = function(elemRow,
                                   entityPathLevels) {
  const allPathLevels = ['root'].concat(entityPathLevels);

  const elemEntityId = allPathLevels.join(SEPAR) + '_content';

  const elemEntity = elemRow.querySelector('#' + elemEntityId);

  if (elemEntity) {
    elemRow.removeChild(elemEntity);
  }
};

/**
 * Entity, like 'student', 'person', 'thing', 'membership'
 * @param {String} propName Name of a property of a parent entity,
 *        eg: 'group.captain = {}' null only for root element
 *        'item' if the parent is ItemList
 * @param {String[]} entityPathLevels
 *        eg: second membership in a group: [group, memberships, 2]
 *        no path levels only for a root element
 * @param {Object} entityTemplate { firstName: 'bar' }
 * @param {String} entitySchema eg: 'Person', 'Thing', 'Membership'
 * @param {Object} defaultValues { firstName: 'Jane', ... } for this entity
 * @returns {Object} DOM element for this entity
 */
const buildEntityElem = function(elemRow,
                                 entityPathLevels,
                                 entitySchema,
                                 entity,
                                 typeCheckers,
                                 isGlobalDisplayOnly) {
  if (!typeCheckers) {
    throw new Error('required_typeCheckers');
  }

  // Если элемент уже существует, его надо обновить, а не строить заново
  // Передавать родительский компонент
  // По нему определять существование и вставлять в него же

  const allPathLevels = ['root'].concat(entityPathLevels);

  const elemEntityId = allPathLevels.join(SEPAR) + '_content';

  // // TODO: find from parentElem (not from document)
  let elemEntity = elemRow.querySelector('#' + elemEntityId);

  if (!entity) {
    throw new Error('required_entity');
  }

  if (!elemEntity) {
    // Создать новый элемент со свойствами
    // Вставить в parentElem
    // По идее каждое обновление хранилища должно полностью перестраивать элемент сущности и встраивать в тело документа (заменять)
    elemEntity = document.createElement('div');
    elemEntity.id = elemEntityId;
    // if (entityPathLevels.length > 0) {
    //   // TODO: propName
    //   microdata.markProperty(elemEntityContent, propName);
    // }
    microdata.markEntity(elemEntity, entitySchema);
    elemRow.appendChild(elemEntity);
    // } else {
    //   // TODO: обновить все внутренние свойства
    //   throw new Error('not_realized_update');
  }

  // console.log('elemEntityContent', elemEntityContent);
  // update or create
  buildElementsFromSettings(elemEntity, entityPathLevels, entity, typeCheckers, isGlobalDisplayOnly); // eslint-disable-line

  return elemEntity;
};

/**
 * It doesnt depends of property name of a parent entity
 * @param {String[]} pathLevels Like ['university', 'students']
 *        Last String must be plural (collection of entities)
 * @param {Object} entitySettings A template for an item of this collection
 * @param {String} entitySchema A schema for an item of this collection, like 'Person'
 * @returns {Object} DOM element: list of items
 */
const buildEntityListElem = function(elemRow,
                                     pathLevels,
                                     entitySchema,
                                     entitySettings,
                                     entityList,
                                     typeCheckers,
                                     isGlobalDisplayOnly) {
  if (pathLevels.length < 1) {
    throw new Error('required_path_levels_non_empty');
  }

  const allPathLevels = ['root'].concat(pathLevels);

  const elemSectionId = allPathLevels.join(SEPAR) + '_content';

  let elemSection = elemRow.querySelector('#' + elemSectionId);

  if (!elemSection) {
    // TODO: change to UL or something listable
    elemSection = document.createElement('div');
    elemSection.id = elemSectionId;
    microdata.markEntity(elemSection, 'ItemList');
    elemRow.appendChild(elemSection);

    // id can be calculated during insertion
    // or on the client (countryId)
    // пользователь указывает ид, имя, возраст
    // данные ассоциативной сущности и самой ассоциации
    // ассоциативная сущность должна существовать в отдельности
    // от текущей сущности
    // данные ассоциации указываются вручную

    // const formInsertion = document.createElement('div');
    // это не обновляемая сущность, а вставляемая (без событий и вычисляемых полей)
    // вставляемая сущность также может содержать внутренние сущности:
    // нужна атомарная операция вставки - только записываемые частные свойства: ид и т.п.
    // некоторые сущности требуют обязательных полей (но это не точно)
    // например isFixed не может быть null
    // buildEntityElem(formInsertion,
    // entityPathLevels,
    // entitySchema,
    // entity)

    const idSetting = entitySettings.id;
    const idPropType = idSetting.type; // 'Country' | 'Integer'

    const typeChecker = typeCheckers[idPropType];
    const elemInsertId = propFactory.createInput(idPropType, typeChecker);
    elemInsertId.setAttribute('data-entity-list-path', pathLevels.join('.'));
    elemInsertId.setAttribute('data-action', 'insertItem');

    elemRow.appendChild(elemInsertId);

    // const elemInsert = document.createElement('button');
    // elemInsert.type = 'button';
    // elemInsert.setAttribute('data-action-type', 'insertItem');
    // elemInsert.setAttribute('data-entity-list-path', pathLevels.join('.'));
    // добавить страну, добавить туриста
    // Кнопка добавляет пустую сущность (с авто ид), которая потом заполняется обновлениями
    // Как ИД сгенерировать? Нулевой нельзя добавить
    // По кол-ву предыдущих записей
    // elemInsert.textContent = 'Add';

    /**
     По нажатию на кнопку отображается форма (всплывающее окно)
     - выбор страны
     - выбор сохранённого туриста (добавление нового)
     */
    // elemRow.appendChild(elemInsert);
  }

  entityListWrapper.updateItems(elemSection,
                                entityList,
                                entitySchema,
                                pathLevels,
                                typeCheckers,
                                isGlobalDisplayOnly,
                                buildEntityElem);

  return elemSection;
  // Update inner list

  // TODO
  // const itemInsertElem = buildItemInsertElem(pathLevels);
  // sectionElem.appendChild(itemInsertElem);
};

// Создаётся элемент свойства
// Отделение создания элемента от установки значения
// Так как значение может меняться
// Другие аттрибуты также могут меняться, например минмакс
// Но в проекте всё делится только на сущность и его свойства
// Обновление свойства - обновляет только значение в соответствующем элементе. Все остальные аттрибуты - константы. Поэтому и нет динамических мин и макс (только статика или хак)
const buildSimpleElem = function(elemRow,
                                 parentPathLevels,
                                 propName,
                                 propType,
                                 propValue,
                                 isDisplayOnly,
                                 typeCheckers) {
  const allPathLevels = ['root'].concat(parentPathLevels.concat(propName));

  const propContentId = allPathLevels.join(SEPAR) + '_content';

  let elemProp = elemRow.querySelector('#' + propContentId);

  if (!elemProp) {
    const typeChecker = typeCheckers[propType];

    if (isDisplayOnly) {
      elemProp = propFactory.createDisplay(propType, typeChecker);
    } else {
      elemProp = propFactory.createInput(propType, typeChecker);
      elemProp.name = buildInputName(parentPathLevels, propName);
      elemProp.setAttribute('data-entity-path', parentPathLevels.join('.') || 'root');
    }

    elemProp.id = propContentId;
    elemRow.appendChild(elemProp);
  }

  if (isDisplayOnly) {
    controlsSetter.setDisplayValue(elemProp, propValue);
  } else {
    controlsSetter.setInputValue(elemProp, propValue);
  }

  return elemProp;
};

const buildAnyElem = function(elemRow, propName, propSetting, parentPathLevels, propValue, typeCheckers, isPropDisplayOnly) {
  if (!propName || !propSetting) {
    throw new Error('required_propName_propSetting');
  }

  if (!elemRow) {
    throw new Error('required_elem_row');
  }

  const propType = propSetting.type;

  if (!propType) {
    throw new Error('required_propType');
  }

  const childEntitySettings = propSetting.refSettings;
  // TODO: schema from inner entity
  const childEntitySchema = propSetting.schema;

  const pathLevels = parentPathLevels.concat(propName);

  switch (propType) {
    case 'Item':
      if (!childEntitySettings) {
        throw new Error('required_ref_for_Item');
      }
      if (!childEntitySchema) {
        throw new Error('required_schema_for_Item: ' + propName);
      }

      // Если сущность была удалена, тогда удалить соотв элемент
      if (!propValue) {
        // console.warn('create_null_props', propName);
        destroyEntityElem(elemRow, pathLevels);
        return null;
      }

      // propValue = entity
      return buildEntityElem(elemRow,
                             pathLevels,
                             childEntitySchema,
                             propValue,
                             typeCheckers,
                             isPropDisplayOnly);

      // only root element without propName
      // itemprop must be outside of scope
      // <div itemprop="student" itemscope itemtype="Person">
      // it's a logical error: inner components do not depend of outer
    case 'ItemList':
      // if no propVaule (entity) - use this settings to build
      //   the insertion form
      if (!childEntitySettings) {
        throw new Error('required_ref_for_ItemList');
      }
      if (!childEntitySchema) {
        throw new Error('required_schema_for_ItemList: ' + propName);
      }

      // propValue = [{ firstName: 'Jane' }]
      // propValue can be null (for non-existing entities)
      return buildEntityListElem(elemRow,
                                 pathLevels,
                                 childEntitySchema,
                                 childEntitySettings,
                                 propValue || [],
                                 typeCheckers,
                                 isPropDisplayOnly); // TODO: null array
    default:
      return buildSimpleElem(elemRow,
                             parentPathLevels,
                             propName,
                             propType,
                             propValue,
                             isPropDisplayOnly,
                             typeCheckers);
  }
};

// TODO: async objects
// 'firstName', ['student', 'person'], false, 'Text', 'Jane'
// 'created', ['memberships', 123], false, 'Date', '2010-01-01'

/**
 * @param {Object} entityTemplate Like {firtsName: {type: 'Text'}}
 * @param {String[]} parentPathLevels Like ['person', 'memberships']
 * @param {Object} entity Like { firtsName: 'Jane' }
 * @returns {Object[]} List of DOM elements
 */
const buildElementsFromSettings = function(elemEntity, parentPathLevels, entity, typeCheckers, isGlobalDisplayOnly) {
  if (!entity || !elemEntity) {
    // entityElement can not exist without an entity
    throw new Error('entity_and_elemEntity_must_exist');
  }

  const entitySettings = entity.__settings;

  Object.keys(entitySettings).forEach(function(propName) {
    // student['name']
    const propSetting = entitySettings[propName];
    const propValue = entity[propName];

    if (propValue === undefined) {
      throw new Error('prop_can_not_be_undefined');
    }

    const propLabel = propSetting.label;
    if (!propLabel) {
      throw new Error('required_label: ' + propName);
    }

    const isPropDisplayOnly = isGlobalDisplayOnly ||
      !!propSetting.calculate ||
      parentPathLevels.indexOf('data') >= 0 ||
      propName === 'loading' ||
      propName === 'error';

    // TODO: root__
    const allPathLevels = ['root'].concat(parentPathLevels.concat(propName));

    const propGlobalId = allPathLevels.join(SEPAR);

    let elemRow = elemEntity.querySelector('#' + propGlobalId);

    if (!elemRow) {
      // Если свойства не существует - создаётся wrap + label + content
      // И добавляется в родительский блок
      // А затем обновляется значение элемента
      elemRow = propRow(propGlobalId);
      elemRow.setAttribute('data-prop-row', propName);

      const elemLabel = document.createElement('label');
      elemLabel.id = propGlobalId + '_label';
      // if writable property, like <input>
      if (!isPropDisplayOnly) {
        elemLabel.htmlFor = propGlobalId + '_content';
      }

      elemLabel.textContent = propLabel;
      elemRow.appendChild(elemLabel); // <td>label</td>

      // Add to parent entity TODO: update
      elemEntity.appendChild(elemRow);
      // } else {
      //   throw new Error('not_realized_update_prop');
    }

    const anyElem = buildAnyElem(elemRow, propName, propSetting, parentPathLevels, propValue, typeCheckers, isPropDisplayOnly);

    if (anyElem) {
      microdata.markProperty(anyElem, propName, propSetting.sameAsProperty);
    }
  });
};

// props.parentPathLevels,
// props.entitySettings,
// props.entitySchema,
// props.entity
module.exports = buildEntityElem;

//   // foreach props - create input, append to div
//   // 'simple' - input
//   // 'Item': again this element with different props
//   // 'ItemList': new container with this elements
// };


// freshList (or ids)
// const buildItemInsertElem = function(pathLevels) {
//   // TODO: load foreignList from store (or url)
//   const foreignList = [{
//     id: 51,
//     created: '2010-01-10'
//   }, {
//     id: 52,
//     created: '2010-01-20'
//   }, {
//     id: 53,
//     created: '2010-02-10'
//   }];

//   const options = foreignList.map(function(item) {
//     // TODO: to spans from string
//     return [item.id + '', item.id + ': ' + item.created];
//   });

//   options.unshift([null, 'select...']);

//   // TODO: remove freshList from foreign list (or mark selected)

//   // build readable form from items <select><option></select>
//   // TODO: async url to load items
//   // add handler to select some item: insertItem to pahtLevels
//   // TODO: add search field for quick adding
// };

