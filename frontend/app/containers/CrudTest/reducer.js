/*
 *
 * CrudTest reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TABLE_LIST } from './constants';

export const initialState = fromJS({
  tableInfo:[]
});

function crudTestReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TABLE_LIST:
      return state.set('tableInfo', action.item);  
    default:
      return state;
  }
}

export default crudTestReducer;
