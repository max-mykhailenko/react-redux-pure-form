/* global describe it expect */
import { FIELD_ON_CHANGE } from '../src/action-types.js';
import reducer from '../src/reducer.js';

const state = {
  user: {
    name: '12',
    surname: '123',
    checkboxes: [1],
  },
};

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer('user')(undefined, {})).toEqual({});
  });

  it('should return the state default for unknown action', () => {
    expect(reducer('user')(state, {
      type: 'UNKNOWN',
      payload: 453,
    })).toEqual(state);
  });

  it('should handle FIELD_ON_CHANGE', () => {
    expect(
      reducer('user')({}, {
        type: FIELD_ON_CHANGE,
        payload: { 'user.name': 'superman' },
      }))
    .toEqual({
      user: {
        name: 'superman',
      },
    },
    );
  });

  it('should handle FIELD_ON_CHANGE with full state', () => {
    expect(
      reducer('user')(state, {
        type: FIELD_ON_CHANGE,
        payload: { 'user.name': 'superman' },
      }))
    .toEqual({
      user: {
        name: 'superman',
        surname: '123',
        checkboxes: [1],
      },
    },
    );
  });
});
