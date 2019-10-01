/*
 *
 * CrudTest actions
 *
 */

import { DEFAULT_ACTION, TABLE_LIST } from './constants';

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
