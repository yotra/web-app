'use strict';

// Side modules
const ComputedState = require('computed-state');
const modelTemplate = require('../../vm-schema');
const inputPolyfill = require('./input-polyfill');
const pubsub = require('./pubsub');
const initialState = require('./initial-state');

const store = new ComputedState(modelTemplate, 'url');

store.update(initialState);

const rootContent = document.getElementById('root_content');

if (!rootContent) {
  throw new Error('no_root_content');
}

inputPolyfill.init(rootContent);

// Подписка на события в хранилище
// перерисовка разметки при изменениях данных
// добавление обработчиков в элементы для изменения данных хранилища
pubsub(rootContent.parentNode, store);

const policy = store.getEntity();

/**
 * Вкладки (табы) не относятся к семантике. Это часть декоративного представления. Модель "Полис" не содержит сведений о группировке её свойств.
 * Переключение вкладок осуществляется пользователем вручную либо автоматически при загрузке:
 * - если все данные валидны и состояние полиса вычисляемое: isCalculable = true, тогда сразу отображается вкладка со списком продуктов
 * - если нет, то вычисляется вкладка с невалидными данными и отображается
 * TODO: вкладки можно отнести к модели как "состояние-шаг заполнения"
 */
const tabs = [
  'insuredPlaces',
  'insuredEvent',
  'insurants',
  'insurer',
  'offers'
];

tabs.forEach(function(tabName) {
  const rowId = 'root__' + tabName;
  const row = document.getElementById(rowId);
  if (!row) {
    throw new Error('no_row: ' + tabName);
  }
  const elemSwitch = document.createElement('input');
  elemSwitch.type = 'radio';
  elemSwitch.name = 'tabview';
  elemSwitch.setAttribute('value', rowId);
  row.insertBefore(elemSwitch, row.firstChild);
});

const goToTab = function(tabName) {
  rootContent.querySelector('input[name=tabview][value=root__' + tabName + ']').checked = true;
};

let needTab;
if (policy.isCalculable === true) {
  needTab = 'offers';
} else {
  // TODO: вычислить нужную вкладку, пока что первая
  needTab = 'insurants'; // 'insuredPlaces';
}

goToTab(needTab);

tabs.forEach(function(tabName) {
  // root__insuredPlacesWarning_content
  const tabElem = rootContent.querySelector('#root__' + tabName + 'Warning');

  if (!tabElem) {
    console.warn('no_tabElem', tabName);
    return;
  }

  tabElem.onclick = function() {
    console.log('onclick', tabName);
    goToTab(tabName);
  };
});

/**
 * Вспомогательная кнопка по переключению между вкладками
 */
// const buttonTabNext = document.createElement('button');
// buttonTabNext.type = 'button';
// buttonTabNext.textContent = 'Далее';
// buttonTabNext.className = 'tab-next';
// rootContent.appendChild(buttonTabNext);
