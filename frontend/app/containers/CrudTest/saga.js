import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import { tableList } from './actions';

export function* fetcTableData() {
    const requestURL = "http://localhost:8000/category";
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };
    try {
      const info = yield call(axios, requestURL, options);
      yield put(tableList(info.data));
    } catch (err) {
      console.dir(err);
    }
    
}
// Individual exports for testing
export default function* defaultSaga() {
  yield fetcTableData();
  // See example in containers/HomePage/saga.js
}
