import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crudTest state domain
 */

const selectCrudTestDomain = state => state.get('crudTest', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CrudTest
 */

const makeSelectCrudTest = () =>
  createSelector(selectCrudTestDomain, substate => substate.toJS());

const makeSelectTableInfo = () =>
  createSelector(selectCrudTestDomain, (substate) => substate.get('tableInfo'));

export default makeSelectCrudTest;
export { selectCrudTestDomain, makeSelectTableInfo };
