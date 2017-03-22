#! /bin/bash -e

npm run lint
npm run test
npm run lint-css
npm run css
npm run js

NBIN="./node_modules/.bin"

# echo $NBIN

$NBIN/babel dist/index.es6.js --out-file dist/index.js

$NBIN/uglifyjs dist/index.js --compress --mangle --output dist/index.min.js

# cp ./src/index.pre.html ./dist/index.html
