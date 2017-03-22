module.exports = {
  id: 0,
  name: 'Полис ВЗР',
  description: 'Электронный страховой полис для выезда за границу: страхование жизни и здоровья, имущества, ответственности и др.',
  insuredEvent: {
    id: 0,
    durationMax: 'P1Y-1D', // 1 year - 1 day
    startDate: '2017-03-03', // tomorrow
    startDateMin: '2017-03-02', // today
    isFixed: false
  },
  insurer: {
    id: 0,
    age: 111
    // query.insurer ? (parseInt(query.insurer.age) || null) : null
  },
  insurants: [{
    id: 1,
    name: 'Jane',
    age: null
  }, {
    id: 2,
    name: 'John',
    age: null
  }],
  insuredPlaces: []
  // {
  //     id: 'finland',
  //     visitDate: '2010-01-01'
  //   }, {
  //     id: 'france',
  //     visitDate: '2010-01-01'
  //   }]
};
