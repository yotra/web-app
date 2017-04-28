require('jsdom').defaultDocumentFeatures = {
  FetchExternalResources: [], // "script"
  ProcessExternalResources: false
};

const jsdom = require('jsdom').jsdom;
const serializeDocument = require('jsdom').serializeDocument;
const ComputedState = require('computed-state');

const modelTemplate = require('../../vm-schema');

const microdataGenerator = require('microdata-generator');

const initialState = require('../src/initial-state');

module.exports = function (req, res) {
  const query = req.query;

  console.log('req.query', query);

  // const initialState = buildStateFromQuery(req.query);

  // TODO: extract url parameters

  const store = new ComputedState(modelTemplate, 'url');
  store.update(initialState);

  const entity = store.getEntity();

  const doc = jsdom(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Gen</title>
    <meta name="HandheldFriendly" content="True"/>
    <meta name="MobileOptimized" content="320"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui"/>
    <link rel="stylesheet" href="./dist/index.css"/>
</head>
<body>
</body>
</html>
`, {
  resourceLoader: function(resource, callback) {
    console.log('resourceLoader', resource.url);
  }
});

  const rootContainer = doc.createElement('form');
  rootContainer.id = 'root';

  global.document = doc;

  // console.log('rootContent', rootContent.outerHTML);

  // rootContent.id = 'root_content';

  const rootLabel = doc.createElement('h1');
  rootLabel.textContent = 'cherahapa страхование';

  const rootSubmit = doc.createElement('input');
  rootSubmit.type = 'submit';
  rootSubmit.value = 'Submit';

  rootContainer.appendChild(rootLabel);
  rootContainer.appendChild(rootSubmit);

  // Добавление, обновление, удаление сущности из контейнера
  // изначально - пустой объект
  // по идее для пустого объекта ничего не надо создавать
  // даже - нужно удалять существующую разметку
  microdataGenerator(rootContainer,
                     [],
                     'FinancialProduct',
                     entity,
                     // isGlobalDisplayOnly
                     false);

  const script = doc.createElement('script');
  script.src = './dist/index.es6.js';

  doc.body.appendChild(rootContainer);
  doc.body.appendChild(script);

  setTimeout(function() {
    res.send(serializeDocument(doc));
  }, 0);
};


// console.log('doc', doc);
// global.document = doc;
