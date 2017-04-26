'use strict';

const membership = {
  // '@context': 'http://schema.org/',
  // '@type': 'Thing',

  url: { type: 'URLID', label: 'ID' },
  created: { type: 'Date', label: 'Creation date' },
  upperUrl: {
    type: 'Text',
    label: 'Upper URL',
    computed: ['url', function (url) {
      if (url === null) { return null; }
      return url.toUpperCase();
    }]
  }
};

// schema.register('Person', 'Thing',
const person = {
  // '@context': 'http://schema.org/',
  // '@type': 'Person',

  url: { type: 'URLID', label: 'ID' },
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
