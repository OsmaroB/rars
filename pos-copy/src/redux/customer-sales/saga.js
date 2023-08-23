import { put, takeEvery } from 'redux-saga/effects';
import {
    getCustomerSalesSlice,
    changeChannelSlice,
    customerSalesGetChannelSlice,
    changeSubChannelSlice,
    changeSubCategoryCustomerSalesSlice,
    getAllCustomerSlice,
    changeStatusModifierModalSlice,
    chageModifierSelectedSlice,
    getModifierProductForIdSlice,
    changeModifierStepSlice,
    setSubmodifierListCustomerSalesSlice,
    setCategoryCustomerSalesSlice,
    setProductCustomerSalesSlice,
    setLevelCustomerSaleSlice,
    setModifierSelectedIDCustomerSaleSlice,
    setSubModifSelectedIDCustomerSalesSlice,
    setDepModiSelectedIDCustomerSalesSlice,
    addOrderCustomerSalesSlice,
    setPriceSelectedCustomerSalesSlice,
    addProductCustomerSalesSlice,
    deleteProductCustomerSalesSlice,
    updateProductCustomerSalesSlice,
    setIdentifierProductSelectedSlice,
    addModifierProductCustomerSalesSlice,
    setClientModalSlice,
    setDocumentModalSlice,
    setDocumentSlice,
    setCustomerSlice,
    setDocumentTypeSlice,
    setPaymentMethodDetailSelectedSlice,
    setPaymentMethodSlice,
    getCashDeskClosingForDateCashDeskStatusSlice,
    setOrderSlice,
    setStatusChangueOrderSlice,
    setOrderModalSlice,
    setOrderSelectedSlice,
    setDiscountsModalSlice,
    setCleanSelectedDetailSlice,
    getChannelSlice,
    setStatusSidebarSlice,
    getPricesForChannelCategorySlice,
    setDescriptionSlice,
    setsearchItems,
    setOrderDataSlice,
    setIsProductModifierClickSlice,
    setDiscountSubchannelSlice
} from './slice';
import {
    getModifierProductsForId as getModifierProductsForIdAPI,
} from '../../apis/modifier-products';
import {
    readCashDeskClosingForDateCashDeskStatus
} from '../../apis/cash-desk-closing';
import {
    getPricesForChannelAndCategory
} from '../../apis/prices';

import {
    GET_CUSTOMER_SALES,
    CUSTOMER_SALES_CHANGE_CHANNEL,
    CUSTOMER_SALES_GET_CHANNEL,
    CUSTOMER_SALES_CHANGE_SUBCHANNEL,
    CHANGE_SUBCATEGORY_CUSTOMER_SALES,
    GET_ALL_CUSTOMER_SALES,
    CHANGE_STATUS_MODIFIER_MODAL,
    CHANGE_MODIFIER_SELECTED,    
    GET_MODIFIER_PRODUCT_FOR_ID,
    CHANGE_MODIFIER_STEP,
    SET_SUBMODIFIER_LIST_CUSTOMER_SALES,
    SET_CATEGORY_CUSTOMER_SALES,
    SET_PRODUCT_CUSTOMER_SALE,
    SET_LEVEL_CUSTOMER_SALE,
    SET_MODIFIER_SELECT_ID_CUSTOMER_SALES,
    SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES,
    SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES,
    ADD_ORDER_CUSTOMER_SALES,
    SET_PRICE_SELECTED_CUSTOMER_SALES,
    ADD_PRODUCT_CUSTOMER_SALES,
    DELETE_PRODUCT_CUSTOMER_SALES,
    UPDATE_PRODUCT_CUSTOMER_SALES,
    SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES,
    ADD_MODIFIER_PRODUCT_CUSTOMER_SALES,
    SET_CLIENT_MODAL_CUSTOMER_SALES,
    SET_DOCUMENT_MODAL_CUSTOMER_SALES,
    SET_DOCUMENT_CUSTOMER_SALES,
    SET_CUSTOMER_CUSTOMER_SALES,
    SET_DOCUMENT_TYPE_CUSTOMER_SALES,
    SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES,
    SET_PAYMENT_METHOD_CUSTOMER_SALES,
    READ_CASH_DESK_CLOSING_FOR_DATE_DESK_STATU_CS,
    SET_ORDER_CUSTOMER_SALES,
    SET_STATUS_ORDER_CUSTOMER_SALES,
    SET_ORDER_MODAL_CUSTOMER_SALES,
    SET_ORDER_SELECTED_CUSTOMER_SALES,
    SET_DISCOUNT_MODAL_CUSTOMER_SALES,
    SET_CLEAN_SELECT_DETAIL_CUSTOMER_SALES,
    GET_CHANNEL_CUSTOMER_DETAIL,
    SET_STATUS_SIDEBAR_CUSTOMER_DETAIL,
    GET_PRICES_FOR_CHANNEL_AND_CATEGORY,
    SET_DESCRIPTION_CUSTOMER_SALES,
    SET_SEARCH_CUSTOMER_SALES,
    SET_ORDER_DATA_CUSTOMER_SALES,
    SET_IS_PRODUCT_MODIFIER_CLICK_CS,
    SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES,
} from '../contants';

export function* getAllCustomerSaga(action){
    yield put(getAllCustomerSlice(action));
}

export function* getPricesForChannelCategorySaga(action){
    try {
        const prices = yield getPricesForChannelAndCategory({
            channelID:action.channelID,
            categoryID:action.categoryID,
        })
        yield put(getPricesForChannelCategorySlice(prices));
    } catch (error) {
        console.log(error);
    }
}

export function* getCustomerSalesSaga(action){
    yield put(getCustomerSalesSlice(action));
}

export function* changeChannelSaga(action){
    yield put(changeChannelSlice(action));
}

export function* customerSalesGetChannelSaga(action){
    yield put(customerSalesGetChannelSlice(action));
}

export function* changeSubChannelSaga(action){
    yield put(changeSubChannelSlice(action));
}

export function* changeSubCategoryCustomerSalesSaga(action){
    yield put(changeSubCategoryCustomerSalesSlice(action));
}

export function* changeStatusModifierModalSaga(action){
    yield put(changeStatusModifierModalSlice(action));
}
export function* changeStatusDiscountsModalSaga(action){
    yield put(setDiscountsModalSlice(action));
}

export function* chageModifierSelectedSaga(action){
    yield put(chageModifierSelectedSlice(action));
}

export function* getModifierProductForIdSaga(action){
    const modifierProduct = yield getModifierProductsForIdAPI(action.modifier.buttonDetail.product.id);
    const newData = {...action, modifierProduct, step:1}
    yield put(getModifierProductForIdSlice(newData));
}

export function* changeModifierStepSaga(action){
    yield put(changeModifierStepSlice(action));
}

export function* setSubmodifierListCustomerSalesSaga(action){
    yield put(setSubmodifierListCustomerSalesSlice(action));
}

export function* setCategoryCustomerSalesSaga(action){
    yield put(setCategoryCustomerSalesSlice(action));
}

export function* setProductCustomerSalesSaga(action){
    yield put(setProductCustomerSalesSlice(action));
}

export function* setLevelCustomerSaleSaga(action){
    yield put(setLevelCustomerSaleSlice(action));
}

export function* setModifierSelectedIDCustomerSaleSaga(action){
    yield put(setModifierSelectedIDCustomerSaleSlice(action));
}

export function* setSubModifSelectedIDCustomerSalesSaga(action){
    yield put(setSubModifSelectedIDCustomerSalesSlice(action));
}

export function* setDepModifSelectedIDCustomerSalesSaga(action){
    yield put(setDepModiSelectedIDCustomerSalesSlice(action));
}

export function* setIdentifierProductSelectedSaga(action){
    yield put(setIdentifierProductSelectedSlice(action));
}

export function* addOrderCustomerSalesSaga(action){
    yield put(addOrderCustomerSalesSlice(action));
}

export function* setPriceSelectedCustomerSalesSaga(action){
    yield put(setPriceSelectedCustomerSalesSlice(action));
}

export function* addProductCustomerSalesSaga(action){
    yield put(addProductCustomerSalesSlice(action));
}

export function* deleteProductCustomerSalesSaga(action){
    yield put(deleteProductCustomerSalesSlice(action));
}

export function* updateProductCustomerSalesSaga(action){
    yield put(updateProductCustomerSalesSlice(action));
}

export function* addModifierProductCustomerSalesSaga(action){
    yield put(addModifierProductCustomerSalesSlice(action));
}

export function* setClientModalSaga(action){
    yield put(setClientModalSlice(action));
}

export function* setDocumentModalSaga(action){
    yield put(setDocumentModalSlice(action));
}

export function* setDocumentSaga(action){
    yield put(setDocumentSlice(action));
}

export function* setCustomerSaga(action){
    yield put(setCustomerSlice(action));
}

export function* setDocumentTypeSaga(action){
    yield put(setDocumentTypeSlice(action));
}

export function* setPaymentMethodDetailSelectedSaga(action){
    yield put(setPaymentMethodDetailSelectedSlice(action));
}

export function* setPaymentMethodSaga(action){
    yield put(setPaymentMethodSlice(action));
}

export function* getCashDeskClosingForDateCashDeskStatusSaga(action){
    const cutX = yield readCashDeskClosingForDateCashDeskStatus(action.cashdeskclosing);
    yield put(getCashDeskClosingForDateCashDeskStatusSlice(cutX));
}

export function* setOrderSaga(action){
    yield put(setOrderSlice(action));
}

export function* setStatusChangueOrderSaga(action){
    yield put(setStatusChangueOrderSlice(action));
}

export function* setOrderModalSaga(action){
    yield put(setOrderModalSlice(action));
}

export function* setOrderSelectedSaga(action){
    yield put(setOrderSelectedSlice(action));
}

export function* setCleanSelectedDetailSaga(action){
    yield put(setCleanSelectedDetailSlice(action));
}

export function* setDescriptionSaga(action){
    yield put(setDescriptionSlice(action));
}

export function* getChannelSaga(action){
    try {
        yield put(getChannelSlice(action));
    } catch (error) {
        console.log(error);
    }
}

export function* setStatusSidebarSaga(action){
    try {
        yield put(setStatusSidebarSlice(action));
    } catch (error) {
        console.log(error);
    }
};

export function* setSearchSaga(action){
    try {
        yield put(setsearchItems(action));
    } catch (error) {
        console.log(error);
    }
}

export function* setOrderDataSaga(action){
    try {
        yield put(setOrderDataSlice(action));
    } catch (error) {
        console.log(error);
    }
}

export function* setIsProductModifierClickSaga(action){
    try {
        yield put(setIsProductModifierClickSlice(action));
    } catch (error) {  
        console.log(error);
    }
}

export function* setDiscountSubchannelSaga(action){
    try {
        yield put(setDiscountSubchannelSlice(action));
    } catch (error) {
        console.log(error);
    }
}



export function* customerSalesSaga(){
    yield takeEvery(GET_CUSTOMER_SALES, getCustomerSalesSaga);
    yield takeEvery(CUSTOMER_SALES_CHANGE_CHANNEL, changeChannelSaga);
    yield takeEvery(CUSTOMER_SALES_GET_CHANNEL, customerSalesGetChannelSaga);
    yield takeEvery(CUSTOMER_SALES_CHANGE_SUBCHANNEL, changeSubChannelSaga);
    yield takeEvery(CHANGE_SUBCATEGORY_CUSTOMER_SALES, changeSubCategoryCustomerSalesSaga);
    yield takeEvery(GET_ALL_CUSTOMER_SALES, getAllCustomerSaga);
    yield takeEvery(CHANGE_STATUS_MODIFIER_MODAL, changeStatusModifierModalSaga);
    yield takeEvery(CHANGE_MODIFIER_SELECTED, chageModifierSelectedSaga);
    yield takeEvery(GET_MODIFIER_PRODUCT_FOR_ID, getModifierProductForIdSaga);
    yield takeEvery(CHANGE_MODIFIER_STEP, changeModifierStepSaga);
    yield takeEvery(SET_SUBMODIFIER_LIST_CUSTOMER_SALES, setSubmodifierListCustomerSalesSaga);
    yield takeEvery(SET_CATEGORY_CUSTOMER_SALES, setCategoryCustomerSalesSaga);
    yield takeEvery(SET_PRODUCT_CUSTOMER_SALE, setProductCustomerSalesSaga);
    yield takeEvery(SET_LEVEL_CUSTOMER_SALE, setLevelCustomerSaleSaga);
    yield takeEvery(SET_MODIFIER_SELECT_ID_CUSTOMER_SALES, setModifierSelectedIDCustomerSaleSaga);
    yield takeEvery(SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES, setDepModifSelectedIDCustomerSalesSaga);
    yield takeEvery(ADD_ORDER_CUSTOMER_SALES, addOrderCustomerSalesSaga);
    yield takeEvery(SET_PRICE_SELECTED_CUSTOMER_SALES, setPriceSelectedCustomerSalesSaga)
    yield takeEvery(ADD_PRODUCT_CUSTOMER_SALES, addProductCustomerSalesSaga);
    yield takeEvery(DELETE_PRODUCT_CUSTOMER_SALES, deleteProductCustomerSalesSaga);
    yield takeEvery(UPDATE_PRODUCT_CUSTOMER_SALES, updateProductCustomerSalesSaga);
    yield takeEvery(SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES, setIdentifierProductSelectedSaga);
    yield takeEvery(ADD_MODIFIER_PRODUCT_CUSTOMER_SALES, addModifierProductCustomerSalesSaga);
    yield takeEvery(SET_CLIENT_MODAL_CUSTOMER_SALES, setClientModalSaga);
    yield takeEvery(SET_DOCUMENT_MODAL_CUSTOMER_SALES, setDocumentModalSaga);
    yield takeEvery(SET_DOCUMENT_CUSTOMER_SALES, setDocumentSaga);
    yield takeEvery(SET_CUSTOMER_CUSTOMER_SALES, setCustomerSaga);
    yield takeEvery(SET_DOCUMENT_TYPE_CUSTOMER_SALES, setDocumentTypeSaga);
    yield takeEvery(SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES, setPaymentMethodDetailSelectedSaga)
    yield takeEvery(SET_PAYMENT_METHOD_CUSTOMER_SALES, setPaymentMethodSaga);
    yield takeEvery(READ_CASH_DESK_CLOSING_FOR_DATE_DESK_STATU_CS, getCashDeskClosingForDateCashDeskStatusSaga)
    yield takeEvery(SET_ORDER_CUSTOMER_SALES, setOrderSaga);
    yield takeEvery(SET_STATUS_ORDER_CUSTOMER_SALES, setStatusChangueOrderSaga);
    yield takeEvery(SET_ORDER_MODAL_CUSTOMER_SALES, setOrderModalSaga);
    yield takeEvery(SET_DISCOUNT_MODAL_CUSTOMER_SALES,changeStatusDiscountsModalSaga);
    yield takeEvery(SET_ORDER_SELECTED_CUSTOMER_SALES, setOrderSelectedSaga);
    yield takeEvery(SET_CLEAN_SELECT_DETAIL_CUSTOMER_SALES, setCleanSelectedDetailSaga);
    yield takeEvery(GET_CHANNEL_CUSTOMER_DETAIL, getChannelSaga);
    yield takeEvery(SET_STATUS_SIDEBAR_CUSTOMER_DETAIL, setStatusSidebarSaga)
    yield takeEvery(GET_PRICES_FOR_CHANNEL_AND_CATEGORY, getPricesForChannelCategorySaga)
    yield takeEvery(SET_DESCRIPTION_CUSTOMER_SALES, setDescriptionSaga);
    yield takeEvery(SET_SEARCH_CUSTOMER_SALES, setSearchSaga)
    yield takeEvery(SET_ORDER_DATA_CUSTOMER_SALES,setOrderDataSaga);
    yield takeEvery(SET_IS_PRODUCT_MODIFIER_CLICK_CS,setIsProductModifierClickSaga);
    yield takeEvery(SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES, setDiscountSubchannelSaga);
}