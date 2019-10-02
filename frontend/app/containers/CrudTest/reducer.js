/*
 *
 * CrudTest reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TABLE_LIST,
  SET_VISIBLE,
  RESET_VISIBLE,
  ADD_ITEM,
  GET_MESSAGE,
  GET_ERR_MESSAGE,
  DELETE_ID,
  UPDATE_ITEM,
} from './constants';

export const initialState = fromJS({
  tableInfo: [],
  addItem: {},
  dialogueVisible: false,
});

function crudTestReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TABLE_LIST:
      return state.set('tableInfo', action.item);
    case ADD_ITEM:
      return state.set('addItem', action.item);
    case UPDATE_ITEM:
      return state.set('updateItem', action.item);
    case DELETE_ID:
      return state.set('deleteId', action.id);
    case SET_VISIBLE:
      return state.set('dialogueVisible', true);
    case RESET_VISIBLE:
      return state.set('dialogueVisible', false);
    case GET_MESSAGE:
      return state.set('setMessage', action.message);

    case GET_ERR_MESSAGE:
      return state.set('setErrMessage', action.errmessage);

    default:
      return state;
  }
}

export default crudTestReducer;
