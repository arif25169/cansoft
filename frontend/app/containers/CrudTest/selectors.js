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

  const makeSelectDialogueVisible = () =>
  createSelector(selectCrudTestDomain, (substate) => substate.get('dialogueVisible'));

  const makeSelectAddItem = () =>
  createSelector(selectCrudTestDomain, (substate) => substate.get('addItem'));

  const makeSelectUpdateItem = () =>
  createSelector(selectCrudTestDomain, (substate) => substate.get('updateItem'));
  
  const makeSelectDeleteId = () =>
  createSelector(selectCrudTestDomain, (substate) => substate.get('deleteId'));
  
  const makeSelectSetMessage = () => 
  createSelector(selectCrudTestDomain, (substate) => substate.get('setMessage'));
  
  const makeSelectSetErrMessage = () => 
  createSelector(selectCrudTestDomain, (substate) => substate.get('setErrMessage'));

export default makeSelectCrudTest;
export { 
  selectCrudTestDomain, 
  makeSelectTableInfo, 
  makeSelectDialogueVisible, 
  makeSelectAddItem ,
  makeSelectUpdateItem,
  makeSelectSetMessage,
  makeSelectSetErrMessage,
  makeSelectDeleteId
};
