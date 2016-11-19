import { FIELD_ON_CHANGE } from './action-types.js';

const INPUT_CHECKBOX = 'checkbox';
const INPUT_SELECT_MULTIPLE = 'select-multiple';
const INPUT = 'input';
const INPUT_RADIO = 'radio';
const INPUT_SELECT = 'select-one';

function getFieldValue(target) {
  if (target.type === INPUT_CHECKBOX) {
    return target.checked ? '1' : '0';
  }

  if (target.type === INPUT_SELECT_MULTIPLE) {
    const values = Array.prototype.reduce.call(target.options, (acc, option) => {
      if (option.selected) {
        return acc.concat(option.value);
      }
      return acc;
    }, []);
    return values;
  }

  // radio
  // condition for react native elements
  return target.value;
}

function getFiedlsFromEvent(e) {
  const target = e.currentTarget;
  const name = target.name;
  const value = getFieldValue(target);
  return {
    [name]: value,
  };
}

export function onChange(name, value) {
  let fields = null;

  switch (true) {
    // event
    case Boolean(typeof name === 'object' && name.type && name.target):
      fields = getFiedlsFromEvent(name);
      break;
    // name and value as args
    case Boolean(typeof name === 'string' && typeof value !== 'undefined'):
      fields = { [name]: value };
      break;
    // multiple fields object
    case Boolean(typeof name === 'object' && typeof value === 'undefined'):
      fields = name;
      break;
    default:
      console.warn('WARNING, not handled event in onChange');
      break;
  }

  // форма должна уметь асинхронно валидироваться
  // форма должна понимать изменилось ли ее состояние с начального
  // атрибуты формы, изменилась ли, прошли ли валидации, может еще че

  return {
    type: FIELD_ON_CHANGE,
    payload: fields,
  };
}
