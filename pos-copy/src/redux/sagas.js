import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import { categorySaga } from './category/saga';
import { subCategorySaga } from './subcategory/saga';
import { channelSaga } from './channels/saga';
import { subChannelSaga } from './subchannels/saga';
import { paymentMethodSaga } from './payment-methods/saga';
import { paymentMethodDetailSaga } from './payment-methods-details/saga';
import { userSaga } from './user/saga';
import { customerSaga } from './customer/saga';
import { discountSaga } from './discount/saga';
import { giftcardSaga } from './gifcard/saga';
import { restaurantSaga } from './restaurants/saga';
import { brandSaga } from './brands/saga';
import { employeeSaga } from './employee/saga';
import { roleSaga } from './role/saga';
import { roleDetailSaga } from './role-detail/saga';
import { articleSaga } from './article/saga';
import { recipeSaga } from './recipe/saga';
import { buttonSaga } from './button/saga';
import { productDetailSaga } from './product-details/saga';
import { productSaga } from './products/saga';
import { recipeArticleSaga } from './recipe-article/saga';
import { categoryButtonSaga } from './category-button/saga';
import { optionalSaga } from './optional/saga';
import { optionalProductSaga } from './optional-product/saga';
import { DocumentTypeSaga } from './document-type/saga';
import { ButtonDetailSaga } from './button-detail/saga';
import { authUserSaga } from './auth-user/saga';
import { priceSaga } from './price/saga';
import { modifierSaga } from './modifier/saga';
import { modifierProductSaga } from './modifier-product/saga';
import { customerSalesSaga } from './customer-sales/saga';
import { SubmodifierSaga } from './submodifier/saga';
import { tiketConfigurationSaga } from './tiket-configuration/saga';
import { cardSubmodifierSaga } from './card-submodifier/saga';
import { cardDepmodifierSaga } from './card-depmodifier/saga';
import { depmodifierSaga } from './depmodifier/saga';
import { outputCashDeskSaga } from './output-cash-desk/saga';
import { cashDeskSaga } from './cash-desk-closing/saga';
import { salesForDateSaga } from './sales-for-date/saga';
import { documentSaga } from './document/saga';
import { saleSaga } from './sale/saga';
import { printSaga } from './prints/saga';

export function* rootSaga() {
  yield all([
    authSagas(),
    categorySaga(),
    subCategorySaga(),
    channelSaga(),
    subChannelSaga(),
    paymentMethodSaga(),
    paymentMethodDetailSaga(),
    userSaga(),
    customerSaga(),
    discountSaga(),
    giftcardSaga(),
    restaurantSaga(),
    brandSaga(),
    employeeSaga(),
    roleSaga(),
    roleDetailSaga(),
    articleSaga(),
    recipeSaga(),
    buttonSaga(),
    productDetailSaga(),
    productSaga(),
    recipeArticleSaga(),
    categoryButtonSaga(),
    optionalSaga(),
    optionalProductSaga(),
    DocumentTypeSaga(),
    ButtonDetailSaga(),
    authUserSaga(),
    priceSaga(),
    modifierSaga(),
    modifierProductSaga(),
    customerSalesSaga(),
    SubmodifierSaga(),
    tiketConfigurationSaga(),
    cardSubmodifierSaga(),
    cardDepmodifierSaga(),
    depmodifierSaga(),
    outputCashDeskSaga(),
    cashDeskSaga(),
    salesForDateSaga(),
    documentSaga(),
    saleSaga(),
    printSaga(),
  ]);
}
export default rootSaga();
