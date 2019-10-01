import { fromJS } from 'immutable';
import crudTestReducer from '../reducer';

describe('crudTestReducer', () => {
  it('returns the initial state', () => {
    expect(crudTestReducer(undefined, {})).toEqual(fromJS({}));
  });
});
