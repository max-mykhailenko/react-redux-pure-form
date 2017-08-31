/* global describe it expect */
import { FIELD_ON_CHANGE } from '../src/action-types.js';
import * as actions from '../src/actions.js';

it('return action object with right type', () => {
  const fields = { 'user.name': 'superman' };
  const expectedAction = {
    type: FIELD_ON_CHANGE,
    payload: fields,
  };
  expect(actions.onChange(fields)).toEqual(expectedAction);
});
