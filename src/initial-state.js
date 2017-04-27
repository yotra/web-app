module.exports = {
  url: 'main',
  name: 'Полис ВЗР',
  description: 'Электронный страховой полис для выезда за границу: страхование жизни и здоровья, имущества, ответственности и др.',
  insuredEvent: {
    url: 'main',
    durationMax: 'P1Y-1D', // 1 year - 1 day
    startDate: '2017-03-03', // tomorrow
    startDateMin: '2017-03-02', // today
    isFixed: false
  },
  insurer: {
    url: 'main',
    age: 111
    // query.insurer ? (parseInt(query.insurer.age) || null) : null
  },
  insurants: [{
    url: 'p1',
    name: 'Jane',
    age: null
  }, {
    url: 'p2',
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
