/**
 * A component factory, like document.createElement
 *
 * Name convention for custom elements:
 * - two or more words
 * - separated by dash
 * - lowercase
 * - Latin characters
 *
 * Boolean-input can be a selector, radio, simple input, etc.
 * it depends of design of a project
 *
 * @todo switch to custom elements after release
 * @todo use <template> to clone instead building elems from scratch
 * @module
 */

'use strict';

// at this moment it's not a class
// will be converted when custom elements will be released
// browserify doesnt support dynamic requires
const BooleanDisplay = require('./boolean-display');
const TextDisplay = require('./text-display');
const NumberDisplay = require('./number-display');
const DateDisplay = require('./date-display');
const UrlDisplay = require('./url-display');
const ImageDisplay = require('./image-display');

const BooleanInput = require('./boolean-input');
const TextInput = require('./text-input');
const NumberInput = require('./number-input');
const AgeInput = require('./age-input');
const DecadeInput = require('./decade-input');
const DateInput = require('./date-input');
const DurationInput = require('./duration-input');
const CountryInput = require('./country-input');

const calculateInput = function(tag) {
  switch (tag) {
    case 'boolean-input':
      return BooleanInput;
    case 'text-input':
    case 'url-input':
      return TextInput;
    case 'number-input':
    case 'integer-input':
    case 'float-input':
      return NumberInput;
    case 'age-input':
      return AgeInput;
    case 'decade-input':
      return DecadeInput;
    case 'date-input':
      return DateInput;
    case 'duration-input':
      return DurationInput;
    case 'country-input':
      return CountryInput;

    default:
      throw new Error('tag_is_not_supported: ' + tag);
  }
};

const calculateDisplay = function(tag) {
  switch (tag) {
    case 'boolean-display':
      return BooleanDisplay;
    case 'text-display':
      return TextDisplay;
    case 'url-display':
      return UrlDisplay;
    case 'image-display':
      return ImageDisplay;
    case 'number-display':
    case 'integer-display':
    case 'float-display':
    case 'age-display':
      return NumberDisplay;
    case 'date-display':
      return DateDisplay;
      // case 'duration-display':
      //   return DurationDisplay;

    default:
      throw new Error('tag_is_not_supported: ' + tag);
  }
};

module.exports = {
  createInput: function(propType, typeChecker) {
    const tag = propType.toLowerCase() + '-input';

    const elemClass = calculateInput(tag);

    const elem = elemClass({}, document, typeChecker); // empty props

    elem.setAttribute('data-schema-type', propType);

    // use classes instead tags, while no custom elements
    elem.className = tag;
    return elem;
  },
  createDisplay: function(propType, typeChecker) {
    const tag = propType.toLowerCase() + '-display';

    const elemClass = calculateDisplay(tag);

    const elem = elemClass({}, document, typeChecker); // empty props

    elem.setAttribute('data-schema-type', propType);

    // use classes instead tags, while no custom elements
    elem.className = tag;
    return elem;
  }
};
