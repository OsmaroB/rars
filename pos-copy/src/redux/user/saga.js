import { put, takeEvery } from 'redux-saga/effects';
import {
  getUser as getUserAPI,
  addUser as addUserAPI,
  updateUser as updateUserAPI,
  removeUser as removeUserAPI,
} from '../../apis/user';
import { errorMessage } from 'helpers/messages';
import {
  getUserSlice,
  openFormUserSlice,
  closeFormUserSlice,
  addUserSlice,
  updateUserSlice,
  removeUserSlice,
  searchUserSlice,
} from './slice';
import {
  GET_USER,
  CLOSE_FORM_USER,
  CLOSE_FORM_CODE,
  OPEN_FORM_USER,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
  SEARCH_USER,
} from '../contants';

export function* getUserSaga() {
  const users = yield getUserAPI();
  yield put(getUserSlice(users.data));
}

export function* updateUserSaga(action) {
  try {
    const updateUser = yield updateUserAPI(action.user);
    if(updateUser.data.status == 500){
      errorMessage('Hay un usuario ya esta creado o has ingresado un correo invalido', 'Error al crear usuario');
    }else{
      const users = yield getUserAPI();
      const newData = { ...action, users: users.data };
      yield put(updateUserSlice(newData));
    }
  } catch (error) {
    
  }
}

export function* addUserSaga(action) {
  try {
    const newUser = yield addUserAPI(action.user);
    const users = yield getUserAPI();
    if(newUser.data.status == 500){
      errorMessage('El usuario ya esta creado o has ingresado un correo invalido', 'Error al crear usuario');
    }else{
      const newData = { ...action, users: users.data };
      yield put(addUserSlice(newData));
    }
  } catch (error) {
    
  }
}

export function* removeUserSaga(action) {
  try {
    yield removeUserAPI(action.user);
    const users = yield getUserAPI();
    const newData = { ...action, users: users.data };
    yield put(removeUserSlice(newData));
  
  } catch (error) {
    
  }
}

export function* searchUserSaga(action) {
  try {
    const users = yield getUserAPI();
    const newData = { ...action, users: users.data };
    yield put(searchUserSlice(newData));
  } catch (error) {
    console.log(error);
  }
}

export function* openFormUserSaga(action) {
  yield put(openFormUserSlice(action));
}
export function* closeFormUserSaga(action) {
  yield put(closeFormUserSlice(action));
}
export function* closeFormCodeSaga(action) {
  yield put(closeFormUserSlice(action));
}

export function* userSaga() {
  yield takeEvery(GET_USER, getUserSaga);
  yield takeEvery(OPEN_FORM_USER, openFormUserSaga);
  yield takeEvery(CLOSE_FORM_USER, closeFormUserSaga);
  yield takeEvery(CLOSE_FORM_CODE, closeFormCodeSaga);
  yield takeEvery(ADD_USER, addUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(REMOVE_USER, removeUserSaga);
  yield takeEvery(SEARCH_USER, searchUserSaga);
}
