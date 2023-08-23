import { put, takeEvery } from 'redux-saga/effects';
import {
  addOutputCashDeskSlice,
  getOutputCashDeskForCutAndStatuSlice,
  getOutputCashDeskForIdSlice,
  getOutputCashDeskSlice,
  removeOutputCashDeskSlice,
  updateOutputCashDeskSlice,
} from './slice';
import {
  getOutputCashForCut as getOutputCashForCutAPI,
  getOutputCashForCutAndStatus as getOutputCashCutAndStatusAPI,
  addOutputCash as addOutputCashAPI,
} from '../../apis/output-cash-desk';
import {
  ADD_OUTPUT_CASH_DESK,
  REMOVE_OUTPUT_CASH_DESK,
  UPDATE_OUTPUT_CASH_DESK,
  GET_OUTPUT_CASH_DESK,
  GET_OUTPUT_CASH_FOR_CUT,
  GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
} from '../contants';

export function* getAllOutputCashDeskSaga(action) {
  console.log(action);
  yield put(getOutputCashDeskSlice(action));
}
export function* addOutputSaga(action) {
  yield addOutputCashAPI(action.outputscashdesk);
  const outputs = yield getOutputCashForCutAPI(action.outputscashdesk);
  const newData = { ...action, outputs: outputs.data };
  yield put(addOutputCashDeskSlice(newData));
}
export function* getOutputCashDeskForCutSaga(action) {
  const outputscashdesk = yield getOutputCashForCutAPI(action.outputscashdesk);
  yield put(getOutputCashDeskForIdSlice(outputscashdesk.data));
}
export function* getOutputCashDeskForCutAndStatusSaga(action) {
  const outputscashdesk = yield getOutputCashCutAndStatusAPI(
    action.outputscashdesk
  );
  yield put(getOutputCashDeskForCutAndStatuSlice(outputscashdesk.data));
}

export function* outputCashDeskSaga() {
  yield takeEvery(GET_OUTPUT_CASH_DESK, getAllOutputCashDeskSaga);
  yield takeEvery(GET_OUTPUT_CASH_FOR_CUT, getOutputCashDeskForCutSaga);
  yield takeEvery(
    GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
    getOutputCashDeskForCutAndStatusSaga
  );
  yield takeEvery(ADD_OUTPUT_CASH_DESK, addOutputSaga);
  /*  yield takeEvery(CHANGE_MODIFIER_SELECTED, chageModifierSelectedSaga);
  yield takeEvery(GET_MODIFIER_PRODUCT_FOR_ID, getModifierProductForIdSaga);
  yield takeEvery(CHANGE_MODIFIER_STEP, changeModifierStepSaga);
  yield takeEvery(
    SET_SUBMODIFIER_LIST_CUSTOMER_SALES,
    setSubmodifierListCustomerSalesSaga
  ); */
  // yield takeEvery(SET_CATEGORY_CUSTOMER_SALES, setCategoryCustomerSalesSaga);
}
