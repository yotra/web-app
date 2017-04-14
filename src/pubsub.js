'use strict';

const entityBuilder = require('./controls/entity-builder');
const typeCheckers = require('../../vm-schema').types;

const PRIMARY_KEY = 'identifier';

const getTypedValue = function(elem) {
  switch (elem.type) {
    case 'checkbox':
      return elem.checked;
    case 'number':
      // "0" ? 0 : null
      return elem.value ? parseFloat(elem.value) : null;
      // elem.valueAsNumber;
    case 'date':
      // no valueAsDate
      return elem.value || null;
    case 'text':
      // TODO: what if NumberType used with <input type=text>
      return elem.value || null;
    case 'select-one':
      // <select>
      return elem.value || null;
    default:
      throw new Error('elem_type_is_not_supported: ' + elem.type);
  }
};

module.exports = function(rootContainer, store) {
  const insertItem = function(entityListPath, itemInsert) {
    try {
      store.insertItem(entityListPath, itemInsert);
    } catch (exc) {
      // console.log('exc', exc);
      alert(exc.message);
    }
  };

  const updateItem = function(entityPath, itemProp, propValue) {
    const upd = {};
    if (entityPath === 'root') {
      upd[itemProp] = propValue;
    } else {
      upd[entityPath + '.' + itemProp] = propValue;
    }

    // console.log('update event', upd);

    store.update(upd);

    // try {
    //   // TODO: age to number
    //   // result = elem.value || null; // elem.value - String
    // } catch (exc) {
    //   throw exc;
    //   // console.log('exc', exc.message);
    //   // TODO: best message
    // }
  };

  rootContainer.addEventListener('change', function(e) {
    // console.log('global onchange', e.target);
    const elem = e.target;

    const schemaType = elem.getAttribute('data-schema-type');

    if (!schemaType) {
      console.log('no_schema_type', elem);
      return;
    }

    const propValue = getTypedValue(elem);
    const itemProp = elem.getAttribute('itemprop');

    // validate propValue by schemaType
    if (propValue !== null && typeCheckers[schemaType].isValid(propValue) === false) {
      alert('invalid_type: ' + schemaType + ' ' + propValue);

      // if store.value already null: nothing changes
      elem.value = null;
      // TODO: or send to the store with null
      elem.dispatchEvent(new Event('change', { bubbles: true }));
      elem.focus();
      return;
    }

    const entityPath = elem.getAttribute('data-entity-path');

    if (entityPath) {
      // TODO: validation

      // update
      updateItem(entityPath, itemProp, propValue);
      return;
    }

    const entityListPath = elem.getAttribute('data-entity-list-path');
    const dataAction = elem.getAttribute('data-action');

    if (dataAction) {
      if (!entityListPath) {
        throw new Error('required_entity-list-path: ' + elem.id);
      }

      if (dataAction === 'insertItem') {
        const itemInsert = {};
        itemInsert[PRIMARY_KEY] = propValue;
        insertItem(entityListPath, itemInsert);
      } else if (dataAction === 'removeItem') {
        const oid = elem.getAttribute('data-entity-oid');
        let idToRemove;
        try {
          idToRemove = JSON.parse(oid);
        } catch (exc) {
          console.warn('parse_error: ', elem.id);
          throw exc;
        }
        console.log('removeItem', entityListPath, idToRemove);
        // removeItem(entityListPath, idToRemove);
      } else {
        throw new Error('dataAction_is_not_supported: ' + dataAction);
      }
    }

    console.warn('no_entity_path', elem.id);
  });

  // для кнопок вставки и удаления из массивом
  rootContainer.addEventListener('click', function(e) {
    // console.log('global onchange', e.target);
    const elem = e.target;

    const dataAction = elem.getAttribute('data-action');

    if (!dataAction) {
      console.warn('no_data_action_on_button', elem.id);
      return;
    }

    const entityListPath = elem.getAttribute('data-entity-list-path');

    if (!entityListPath) {
      throw new Error('required_entity-list-path: ' + elem.id);
    }

    if (dataAction !== 'removeItem') {
      console.warn('only_removeItem_data-action', elem.id);
      return;
    }

    const oid = elem.getAttribute('data-entity-oid');
    let idToRemove;
    try {
      idToRemove = JSON.parse(oid)[PRIMARY_KEY];
    } catch (exc) {
      console.warn('parse_error: ', elem.id);
      throw exc;
    }
    console.log('removeItem', entityListPath, idToRemove);
    try {
      store.removeItem(entityListPath, idToRemove);
    } catch (exc) {
      alert('Не удалось удалить: ' + exc.message);
    }
  });

  store.subscribe(function(changedKeys, stateFresh) {
    // console.log('changedKeys TODO', changedKeys);

    entityBuilder(rootContainer,
                  [],
                  'FinancialProduct',
                  stateFresh,
                  typeCheckers,
                  // isGlobalDisplayOnly
                  false);
  });
};

// Перерисовка разметки сущности
// Есть сущность (данные), есть разметка сущности (не вью)
// Изменения в сущности - изменяют и разметку
// Разметка может быть создана до создания модели. Так как разметка зависит от хранилища, а не от содержащейся в ней модели. Без модели разметка будет пуста, либо содержать прелоадер.
/**
 * Сперва создаётся хранилище и начальная модель
 * Затем разметка
 * либо
 * Разметка подписывается на изменение хранилища.
 * Объявляется-создаётся начальная сущность - перерисовывается разметка
 * Если контейнер сущности не существует, то создаётся
 * Если существует, то обновляется
 * Если самой сущности не существует, то контейнер удаляется
 root: {
 id: 123,
 tour: {

 }
 }
 */

// subscribe to all changes
// когда изменяется любое поле - находить это поле и изменять значение
// Если сущности ещё не было - создавать заново по соотв настройкам
// Например при изменении insurer.age, также могут измениться вычисляемые поля: isAdult, etc.
// Функция получает список изменённых полей:
// - insurer.age
// - insurer.isAdult
// - insurer (как общее свойство)
// { insurer: { age: true, isAdult: true }, isCalculable: true }
// or
// [ 'insurer', 'insurer.age', 'insurer.isAdult', 'isCalculable' ]
// entity: [ changedProps ]
// policy: [ 'start' , 'end', 'insurer', 'countries', insurer: {} ]
// policy.insurer: [ 'name', 'age' ]
// policy.countries.usa: [ '123', 'asdf' ]
// массивы и внутренние объекты получают общие изменённые ключи
// для их перерисовки - пересматриваются все свойства и изменяются индивидуально, если требуется
// Связь поля с обёрткой - позже
// Стэйт будет равен нулл, если корневая сущность ещё не создана

// const rootElemNew = entityBuilder({
//   parentPathLevels: [],
//   entitySettings: stateFresh.__settings,
//   entitySchema: 'Policy',
//   // изначально - пустой объект
//   // по идее для пустого объекта ничего не надо создавать
//   // даже - нужно удалять существующую разметку
//   entity: stateFresh,
// }, document);

// const rootContentCurrent = document.getElementById('root_content');

// if (!rootContentCurrent) { console.log('no root_content'); return; }

// const parentNode = rootContentCurrent.parentNode;

// parentNode.removeChild(rootContentCurrent);
// rootElemNew.id = 'root_content';
// parentNode.appendChild(rootElemNew);

  // rootContainer.addEventListener('click', function(e) {
  //   const elem = e.target;
  //   const actionType = elem.getAttribute('data-action-type');
  //   const entityListPath = elem.getAttribute('data-entity-list-path');

  //   if (!actionType) { return; }

  //   if (!entityListPath) {
  //     console.warn('no_entity-list-path', actionType);
  //     return;
  //   }

  //   switch (actionType) {
  //     case 'updateItem':
  //       break;
  //     case 'insertItem':
  //       store.insertItem(entityListPath, {
  //         id: new Date().getTime()  // auto-generated id
  //       });
  //       break;
  //     case 'removeItem':
  //       break;
  //     default:
  //       throw new Error('not_supported: ' + actionType);
  //   }

  //   console.log('actionType', actionType);
  // });
