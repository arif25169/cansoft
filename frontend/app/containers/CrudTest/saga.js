import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import { tableList, getErrMessage, getMessage } from './actions';
import { makeSelectAddItem, makeSelectDeleteId, makeSelectUpdateItem } from './selectors';
import { ADD_ITEM, DELETE_ID, UPDATE_ITEM } from './constants';

export function* fetchTableData() {
    const requestURL = "http://localhost:8000/user";
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
export function* createTableData() {
    const saveData = yield select(makeSelectAddItem());
    console.log(saveData)
    const requestURL = "http://localhost:8000/user";
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      data: (saveData)
    };
    try {
      const info = yield call(axios, requestURL, options);
      console.log(info.data)
      if (info){
        if (info.data.response==1){
          console.log("here")
          yield put(getMessage(info.data.message));
          yield fetchTableData();
        } else   if (info.data.response==2){
          console.log("my")
          yield put(getErrMessage(info.data.message));
        }
      }
      //yield put(tableList(info.data));
    } catch (err) {
      console.dir(err);
    }  
}
export function* updateTableData() {
    const updateDate = yield select(makeSelectUpdateItem());
    console.log(updateDate)
    const requestURL = "http://localhost:8000/user";
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      data: (updateDate)
    };
    try {
      const info = yield call(axios, requestURL, options);
      console.log(info.data)
      if (info){
        if (info.data.response==1){
          console.log("here")
          yield put(getMessage(info.data.message));
          yield fetchTableData();
        } else   if (info.data.response==2){
          console.log("my")
          yield put(getErrMessage(info.data.message));
        }
      }
      //yield put(tableList(info.data));
    } catch (err) {
      console.dir(err);
    }  
}
export function* deleteById() {
    const deleteId = yield select(makeSelectDeleteId());
    console.log(deleteId)
    const requestURL = "http://localhost:8000/user";
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      data: ({"id":deleteId})
    };
    try {
      const info = yield call(axios, requestURL, options);
      console.log(info.data)
      if (info){
        if (info.data.response==1){
          console.log("here")
          yield put(getMessage(info.data.message));
          yield fetchTableData();
        } else   if (info.data.response==2){
          console.log("my")
          yield put(getErrMessage(info.data.message));
        }
      }
      //yield put(tableList(info.data));
    } catch (err) {
      console.dir(err);
    }  
}
// Individual exports for testing
export default function* defaultSaga() {
  yield fetchTableData();
  yield takeLatest(ADD_ITEM, createTableData);
  yield takeLatest(UPDATE_ITEM, updateTableData);
  yield takeLatest(DELETE_ID, deleteById);
  // See example in containers/HomePage/saga.js
}
