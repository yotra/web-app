'use strict';

const expect = require('chai').expect;

const ComputedState = require('computed-state');
const modelTemplate = require('./person');
const typeCheckers = require('../../vm-schema').types;

const pubsub = require('../src/pubsub');

const entityBuilder = require('../src/controls/entity-builder');

const findPropertyElem = function(entityLayout, propertyName) {
  return entityLayout.querySelector('[itemprop=' + propertyName + ']');
};

describe('person-markup-generator', function() {
  let store;
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    store = new ComputedState(modelTemplate);

    const rootLabel = document.createElement('h1');
    rootLabel.textContent = 'Person';
    container.appendChild(rootLabel);

    store.update({
      id: 'asdf'
    });

    entityBuilder(container,
                  [],
                  'Person',
                  store.getEntity(),
                  typeCheckers);

    pubsub(container, store);
  });

  afterEach(function() {
    document.body.removeChild(container);
    store = null;
    container = null;
  });

  it('should ready', function(done) {
    // console.log(container.firstChild.innerHTML);
    expect(container.firstChild.nextSibling.getAttribute('itemtype')).to.equal('http://schema.org/Person');

    store.update({
      age: 123
    });

    const ageElem = findPropertyElem(container, 'age');
    expect(ageElem).to.not.null;
    expect(ageElem.value).to.equal('123');

    const membershipsElem = findPropertyElem(container, 'memberships');
    expect(membershipsElem).to.not.null;
    // label must be out of the list <tr><td>Label</td><td>List</td></tr>
    // expect(membershipsElem.querySelector('h1').innerHTML).to.equal('NameFromConfig');

    setTimeout(function() {
      done();
    }, 0);
  });

  it('should update', function(done) {
    // console.log(container.innerHTML);
    const ageElem = findPropertyElem(container, 'age');
    expect(ageElem).to.not.null;
    expect(ageElem.value).to.equal('');

    store.subscribe(function(changedKeys, state) {
      expect(changedKeys).to.deep.equal(['age', 'ageString']);
      expect(state.age).to.equal(123);
      const ageStringElem = findPropertyElem(container, 'ageString');
      // console.log(ageStringElem.innerHTML);
      expect(ageStringElem.textContent).to.equal('123 years');
      done();
    });

    ageElem.value = '123';
    ageElem.dispatchEvent(new Event('change', { bubbles: true }));
    // store.update({
    //   age: 123
    // });
  });

  it('should update array programly', function(done) {
    store.subscribe(function(changedKeys, state) {
      expect(changedKeys).to.deep.equal(['memberships']);
      expect(state.memberships).to.deep.equal([{
        id: 123,
        created: '2010-01-01',
        cid: 'c123'
      }, {
        id: 234,
        created: '2010-02-01',
        cid: 'c234'
      }]);

      const membershipsElem = findPropertyElem(container, 'memberships');
      // console.log(membershipsElem.innerHTML);
      const listItemNodes = membershipsElem.children;
              // querySelectorAll('[itemscope]');
      // console.log('listItemNodes', listItemNodes);
      expect(listItemNodes.length).to.equal(2);

      const mainNode = listItemNodes[0];
      // expect(mainNode.getAttribute('itemprop')).to.equal('itemListElement');
      // expect(mainNode.getAttribute('itemtype')).to.equal('http://schema.org/ListItem');

      // // const itemPositionElem = mainNode.querySelector('[itemprop=position]');
      // // expect(itemPositionElem.textContent).to.equal('1');

      // const entityElem = mainNode.querySelector('[itemprop=item]');
      // expect(entityElem).to.not.null;
      // expect(entityElem.getAttribute('itemtype')).to.equal('http://schema.org/Thing');

      // // console.log(entityElem.innerHTML);

      const idElem = mainNode.querySelector('[itemprop=id]');
      expect(idElem).to.not.null;
      expect(idElem.value).to.equal('123');

      const createdElem = mainNode.querySelector('[itemprop=created]');
      expect(createdElem).to.not.null;
      expect(createdElem.value).to.equal('2010-01-01');

      const cidElem = mainNode.querySelector('[itemprop=cid]');
      expect(cidElem).to.not.null;
      expect(cidElem.textContent).to.equal('c123');

      done();
    });

    store.update({
      memberships: [{
        id: 123,
        created: '2010-01-01'
      }, {
        id: 234,
        created: '2010-02-01'
      }]
    });

    // or:
    // store.insertItem('memberships', {
    //   id: 123,
    //   created: '2010-01-01'
    // });
  });

  it('should update inner item', function (done) {
    store.update({
      memberships: [{
        id: 123,
        created: '2010-01-01'
      }, {
        id: 234,
        created: '2010-02-01'
      }]
    });

    const elemCreated = container.querySelector('[itemprop=memberships] [itemprop=created]');
    expect(elemCreated).to.not.null;
    expect(elemCreated.value).to.equal('2010-01-01');

    store.subscribe(function(changedKeys, state) {
      expect(changedKeys).to.deep.equal(['memberships']);
      // console.log('changedKeys inner item', changedKeys);
      expect(state.memberships[0].created).to.equal('2010-05-05');

      expect(elemCreated.value).to.equal('2010-05-05');

      done();
    });

    // create a picker
    elemCreated.dispatchEvent(new Event('focus'));

    // set a value
    elemCreated.value = '2010-05-05';

    // a change event -> picker event
    elemCreated.dispatchEvent(new Event('change', { bubbles: true }));

    expect(elemCreated.value).to.equal('2010-05-05');
  });
});
