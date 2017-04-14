'use strict';

const membership = {
  // '@context': 'http://schema.org/',
  // '@type': 'Thing',

  identifier: { type: 'Integer', label: 'ID' },
  created: { type: 'Date', label: 'Creation date' },
  cid: {
    type: 'Text',
    label: 'Text ID',
    computed: ['identifier', function (identifier) {
      if (identifier === null) { return null; }
      return 'c' + identifier;
    }]
  }
};

// schema.register('Person', 'Thing',
const person = {
  // '@context': 'http://schema.org/',
  // '@type': 'Person',

  identifier: { type: 'Text', label: 'ID' },
  birthDate: { type: 'Date', label: 'Birthday' },

  /**
   * возраст
   * не обязательное, тип инт, ограничение минимум 0
   * Если возраст указан, он должен быть валидным
   */
  age: { type: 'Integer', label: 'Age' },

  ageString: {
    type: 'Text',
    label: 'Age',
    computed: ['age', function (age) {
      if (age === null) { return null; }
      return age + ' years';
    }]
  },

  /** first, last names */
  familyName: { type: 'Text', label: 'First name' },
  givenName: { type: 'Text', label: 'Last name' },

  memberships: {
    type: 'ItemList',
    ref: membership,
    schema: 'Thing',
    label: 'Memberships'
  }
};

module.exports = person;
