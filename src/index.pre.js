'use strict';

// Side modules
const ComputedState = require('computed-state');
const modelTemplate = require('../../vm-schema').policySchema;
const inputPolyfill = require('./input-polyfill');
const pubsub = require('./pubsub');
const initialState = require('./initial-state');

const store = new ComputedState(modelTemplate);

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

const goToTab = function(tabName) {
  rootContent.querySelector('input[name=tabview][value=root__' + tabName + ']').checked = true;
};

const policy = store.getEntity();
let needTab;
if (policy.isCalculable === true) {
  needTab = 'offers';
} else {
  // TODO: вычислить нужную вкладку, пока что первая
  needTab = 'insuredPlaces';
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
