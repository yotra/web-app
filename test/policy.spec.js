'use strict';

const expect = require('chai').expect;

const ComputedState = require('computed-state');
const modelTemplate = require('../../vm-schema/index').policySchema;
const typeCheckers = require('../../vm-schema/index').types;

const pubsub = require('../src/pubsub');

const entityBuilder = require('../src/controls/entity-builder');

const findPropertyElem = function(entityLayout, propertyName) {
  return entityLayout.querySelector('[itemprop=' + propertyName + ']');
};

const PRIMARY_KEY = 'url';

describe('policy-markup-generator', function() {
  let store;
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    store = new ComputedState(modelTemplate, 'url');

    const rootLabel = document.createElement('h1');
    rootLabel.textContent = 'Policy';
    container.appendChild(rootLabel);

    store.update({
      url: 'main',
      insuredEvent: {
        url: 'main',
        durationMax: 'P1Y-1D' // 1 year - 1 day
      },
      insurer: {
        url: 'main'
      }
      // offers: {
      //   data: []
      // }
    });

    entityBuilder(container,
                  [],
                  'FinancialProduct',
                  store.getEntity(),
                  typeCheckers,
                  false);

    pubsub(container, store);
  });

  afterEach(function() {
    document.body.removeChild(container);
    store = null;
    container = null;
  });

  it('should ready', function(done) {
    // console.log(container.firstChild.innerHTML);
    expect(container.firstChild.nextSibling.getAttribute('itemtype')).to.equal('http://schema.org/FinancialProduct');

    const elemId = findPropertyElem(container, PRIMARY_KEY);
    expect(elemId).to.not.null;
    expect(elemId.value).to.equal('main');
    done();
  });

  it('should insert insurants programly', function(done) {
    const elemInsurants = findPropertyElem(container, 'insurants');
    expect(elemInsurants).to.not.null;

    store.subscribe(function(changedKeys) {
      expect(changedKeys).to.deep.equal(['insurants', 'insurantsWarning']);

      // const elemItemList = findPropertyElem(elemInsurants, 'itemListElement');

      // const elemPosition = findPropertyElem(elemItemList, 'position');
      // expect(elemPosition).to.not.null;
      // expect(elemPosition.textContent).to.equal('1');

      // const elemItem = findPropertyElem(elemItemList, 'item');
      // expect(elemItem).to.not.null;

      // // console.log(elemItem.innerHTML);

      const elemItemId = findPropertyElem(elemInsurants, PRIMARY_KEY);
      expect(elemItemId).to.not.null;
      expect(elemItemId.value).to.equal('p5');

      done();
    });

    store.insertItem('insurants', {
      url: 'p5',
      name: 'Jane'
    });
  });

  it('should removeItem of insurants', function(done) {
    store.insertItem('insurants', {
      url: 'p5',
      name: 'Jane'
    });

    const elemInsurants = findPropertyElem(container, 'insurants');
    expect(elemInsurants).to.not.null;

    const elemId = findPropertyElem(elemInsurants, PRIMARY_KEY);
    expect(elemId).to.not.null;

    // TODO: a button to remove
    store.removeItem('insurants', 'p5');

    // TODO: why elemId not changed?
    const elemNewId = findPropertyElem(elemInsurants, PRIMARY_KEY);

    // console.log('elme', elemId);

    expect(elemNewId).to.null;
    done();
  });

  it('should update insurant', function(done) {
    store.insertItem('insurants', {
      url: 'p7',
      name: 'Jane',
      age: 100
    });

    const elemInsurants = findPropertyElem(container, 'insurants');

    // first insurant
    const elemAge = findPropertyElem(elemInsurants, 'age');

    expect(elemAge).to.not.null;
    expect(elemAge.value).to.equal('100');

    const elemIsAdult = findPropertyElem(container, 'isAdult');

    expect(elemIsAdult).to.not.null;
    expect(elemIsAdult.textContent).to.equal('true');

    elemAge.value = '5';

    elemAge.dispatchEvent(new Event('change', { bubbles: true }));

    expect(elemIsAdult.textContent).to.equal('false');

    // incorrect value: change to null
    elemAge.value = '-123';

    elemAge.dispatchEvent(new Event('change', { bubbles: true }));

    expect(elemIsAdult.textContent).to.equal('null');
    expect(elemAge.value).to.equal('');

    done();
  });
});
