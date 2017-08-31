import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {
  formActions,
  mergeActionsToProps,
  formReducer,
  createFormReducer,
} from '../dist/redux-pure-form.min.js';
import type { Action } from '../src/types.js';

class Example extends Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
    this.setDefaults = this.setDefaults.bind(this);
  }

  handle(e, formName) {
    this.props.fieldAttrs.onChange({
      [e.target.name]: e.target.value,
      [`${formName}.surnameduplicate`]: {
        value: e.target.value,
        parser: value => `${value.toUpperCase().replace(/ /g, '')}!`,
      },
    });
  }

  setDefaults(formName) {
    this.props.fieldAttrs.onChange({
      [formName]: { name: 'superman' },
    });
  }

  render() {
    // console.log('user =>', this.props);
    return (
      <div className="row">
        <form>
          <input
            type="text"
            name="user.name"
            value={this.props.user.name}
            {...this.props.fieldAttrs}
          />
          <input
            type="text"
            name="user.surname"
            value={this.props.user.surname}
            {...this.props.fieldAttrs}
            onChange={e => this.handle(e, 'user')}
          />
          <input
            type="text"
            name="user.surnameduplicate"
            value={this.props.user.surnameduplicate || ''}
            {...this.props.fieldAttrs}
          />
          <br />
          <br />
          <select value={this.props.user.gender} name="user.gender" {...this.props.fieldAttrs}>
            <option value="1">male</option>
            <option value="2">female</option>
          </select>
          <br />
          <br />
          <select
            value={this.props.user.resources}
            name="user.resources"
            multiple="multiple"
            size="2"
            {...this.props.fieldAttrs}
          >
            <option value="1">res 1</option>
            <option value="2">res 2</option>
          </select>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              name="user.checkboxes[]"
              checked={this.props.user.checkboxes ? this.props.user.checkboxes.includes('1') : false}
              value="1"
              {...this.props.fieldAttrs}
            />
            First checkbox
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="user.checkboxes[]"
              checked={this.props.user.checkboxes ? this.props.user.checkboxes.includes('2') : false}
              value="2"
              {...this.props.fieldAttrs}
            />
            Second one
          </label>
          <br />
          <br />
          <button type="button" onClick={() => this.setDefaults('user')}>set default values</button>
        </form>
        <form>
          <input
            type="text"
            name="profile.name"
            value={this.props.profile.name}
            {...this.props.fieldAttrs}
          />
          <input
            type="text"
            name="profile.surname"
            value={this.props.profile.surname}
            {...this.props.fieldAttrs}
            onChange={e => this.handle(e, 'profile')}
          />
          <input
            type="text"
            name="profile.surnameduplicate"
            value={this.props.profile.surnameduplicate || ''}
            {...this.props.fieldAttrs}
          />
          <br />
          <br />
          <select value={this.props.profile.gender} name="profile.gender" {...this.props.fieldAttrs}>
            <option value="1">male</option>
            <option value="2">female</option>
          </select>
          <br />
          <br />
          <select
            value={this.props.profile.resources}
            name="profile.resources"
            multiple="multiple"
            size="2"
            {...this.props.fieldAttrs}
          >
            <option value="1">res 1</option>
            <option value="2">res 2</option>
          </select>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              name="profile.checkboxes[]"
              checked={this.props.profile.checkboxes ? this.props.profile.checkboxes.includes('1') : false}
              value="1"
              {...this.props.fieldAttrs}
            />
            First checkbox
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="profile.checkboxes[]"
              checked={this.props.profile.checkboxes ? this.props.profile.checkboxes.includes('2') : false}
              value="2"
              {...this.props.fieldAttrs}
            />
            Second one
          </label>
          <br />
          <br />
          <button type="button" onClick={() => this.setDefaults('profile')}>set default values</button>
        </form>
        <div>
          <pre>
            {JSON.stringify(this.props.user, null, 2)}
            <br />
            {JSON.stringify(this.props.profile, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  fieldAttrs: PropTypes.object,
};

function mapStateToProps(state: Object): Object {
  return {
    user: state.user,
    profile: state.ReducerWithNesting.profile,
  };
}


const user = createFormReducer('user');

function ReducerWithNesting(state = {}, action) {
  switch (action.type) {
    default:
      return formReducer('profile')(state, action);
  }
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({ user, ReducerWithNesting }),
  {
    user: { name: '12', surname: '123', checkboxes: [] },
    ReducerWithNesting: { profile: { name: 'profile', surname: '123', checkboxes: [] } },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const Connected = connect(mapStateToProps, formActions, mergeActionsToProps)(Example);

render((
  <Provider store={store}>
    <Connected />
  </Provider>
), document.getElementById('js--content'));

