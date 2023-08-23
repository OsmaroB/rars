import { put, takeEvery } from 'redux-saga/effects';
import {
    getRestaurant as getRestaurantAPI,
    addRestaurant as addRestaurantAPI,
    updateRestaurant as updateRestaurantAPI,
} from '../../apis';
import {
    getRestaurantSlice,
    openFormRestaurantSlice,
    closeFormRestaurantSlice,
    addRestaurantSlice,
    updateRestaurantSlice,
    removeRestaurantSlice,
    searchRestaurantSlice,
} from './slice';
import {
    GET_RESTAURANT,
    CLOSE_FORM_RESTAURANT,
    OPEN_FORM_RESTAURANT,
    ADD_RESTAURANT,
    UPDATE_RESTAURANT,
    REMOVE_RESTAURANT,
    SEARCH_RESTAURANT,
} from '../contants';

export function* getRestaurantSaga(){
    const restaurants = yield getRestaurantAPI();
    yield put(getRestaurantSlice(restaurants.data));
}

export function* updateRestaurantSaga(action){
    yield updateRestaurantAPI(action.restaurant);
    const restaurants = yield getRestaurantAPI();
    const newData = {...action, restaurants:restaurants.data};
    yield put(updateRestaurantSlice(newData));
}

export function* addRestaurantSaga(action){
    yield addRestaurantAPI(action.restaurant);
    const restaurants = yield getRestaurantAPI();
    const newData = {...action, restaurants:restaurants.data};
    yield put(addRestaurantSlice(newData));
}

export function* removeRestaurantSaga(action){
    yield updateRestaurantAPI(action.restaurant);
    const restaurants = yield getRestaurantAPI();
    const newData = {...action, restaurants:restaurants.data};
    yield put(removeRestaurantSlice(newData));
}

export function* searchRestaurantSaga(action){
    const restaurants = yield getRestaurantAPI();
    const newData = {...action,restaurants:restaurants.data};
    yield put(searchRestaurantSlice(newData));
}

export function* openFormRestaurantSaga(action){ yield put(openFormRestaurantSlice(action)); }
export function* closeFormRestaurantSaga(action){ yield put(closeFormRestaurantSlice(action)); }

export function* restaurantSaga(){
    yield takeEvery(GET_RESTAURANT, getRestaurantSaga);
    yield takeEvery(OPEN_FORM_RESTAURANT, openFormRestaurantSaga);
    yield takeEvery(CLOSE_FORM_RESTAURANT, closeFormRestaurantSaga);
    yield takeEvery(ADD_RESTAURANT, addRestaurantSaga);
    yield takeEvery(UPDATE_RESTAURANT, updateRestaurantSaga);
    yield takeEvery(REMOVE_RESTAURANT, removeRestaurantSaga);
    yield takeEvery(SEARCH_RESTAURANT, searchRestaurantSaga);
}