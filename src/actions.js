import { FIELD_ON_CHANGE } from './action-types.js';
import type { Action } from './types.js';

const INPUT_CHECKBOX = 'checkbox';
const INPUT_SELECT_MULTIPLE = 'select-multiple';
const INPUT = 'input';
const INPUT_RADIO = 'radio';
const INPUT_SELECT = 'select-one';


type FieldValue = string | null | string[];

function getFieldValue(target: Object): FieldValue {
  if (target.type === INPUT_CHECKBOX) {
    if (target.name.endsWith('[]')) {
      return target.value;
    }

    switch (true) {
      case target.value === 'true':
        return target.checked ? 'true' : 'false';
      case target.value === '1':
        return target.checked ? '1' : '0';
      default:
        return target.checked ? target.value : null;
    }
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


function getFiedlsFromEvent(e: Event): Object {
  const target: HTMLInputElement = e.currentTarget;
  const name: string = target.name;
  const value: FieldValue = getFieldValue(target);
  return {
    [name]: value,
  };
}


export function onChange(name: any, value: any): Action {
  let fields: Object = {};

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

  return {
    type: FIELD_ON_CHANGE,
    payload: fields,
  };
}
