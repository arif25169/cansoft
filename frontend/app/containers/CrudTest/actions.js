/*
 *
 * CrudTest actions
 *
 */

import { DEFAULT_ACTION, TABLE_LIST, SET_VISIBLE, RESET_VISIBLE, ADD_ITEM, GET_MESSAGE, GET_ERR_MESSAGE, DELETE_ID, UPDATE_ITEM } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function tableList(item) {
  return {
    type: TABLE_LIST,
    item
  };
}
export function addItem(item) {
  return {
    type: ADD_ITEM,
    item
  };
}
export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    item
  };
}
export function deleteId(id) {
  return {
    type: DELETE_ID,
    id
  };
}

export function setVisible() {
  return {
    type: SET_VISIBLE,
  };
}

export function resetVisible() {
  return {
    type: RESET_VISIBLE,
  };
}

export function getMessage(message) {
  return {
    type: GET_MESSAGE,
    message,
  }
}

export function getErrMessage(errmessage) {
  return {
    type: GET_ERR_MESSAGE,
    errmessage,
  }
}