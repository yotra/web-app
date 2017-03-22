require('jsdom').defaultDocumentFeatures = {
  FetchExternalResources: [], // "script"
  ProcessExternalResources: false
};

const jsdom = require('jsdom').jsdom;
const serializeDocument = require('jsdom').serializeDocument;

module.exports = function (req, res) {
  const productId = req.params.id;

  console.log('productId', productId);

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

  // console.log('stateFresh', stateFresh.visaGettingDate);

  global.document = doc;

  const rootLabel = doc.createElement('h1');
  rootLabel.textContent = 'Страховой продукт №' + productId;
  rootContainer.appendChild(rootLabel);

  const rootContent = doc.createElement('p');
  rootContent.textContent = 'Информация о продукте, заполнение данных, оплата';
  rootContainer.appendChild(rootContent);

  doc.body.appendChild(rootContainer);

  res.send(serializeDocument(doc));
};


// console.log('doc', doc);
// global.document = doc;
