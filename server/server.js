'use strict';

const express = require('express');
// TODO: use path
// const path = require('path');
const routeItemList = require('./route-item-list');
const routeItem = require('./route-item');

const app = express();

app.get('/c', routeItemList);

app.get('/product/:id', routeItem);

// const fullDir = path.join(__dirname, 'scripts')
app.use('/dist', express.static('./dist'));

app.use('/', express.static('./server/pages'));

app.listen(3000, function () {
  console.log('listening on port 3000');
});
