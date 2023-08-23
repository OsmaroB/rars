// import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import reducers from './reducers';
import { rootSaga } from './sagas';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import category from './category/slice';
import subcategories from './subcategory/slice';
import channels from './channels/slice';
import subchannels from './subchannels/slice';
import paymentMethods from './payment-methods/slice';
import paymentMethodDetails from './payment-methods-details/slice';
import users from './user/slice';
import customers from './customer/slice';
import giftcards from './gifcard/slice';
import discounts from './discount/slice';
import restaurants from './restaurants/slice';
import brands from './brands/slice';
import employees from './employee/slice';
import roles from './role/slice';
import roleDetails from './role-detail/slice';
import articles from './article/slice';
import recipes from './recipe/slice';
import buttons from './button/slice';
import productDetails from './product-details/slice';
import products from './products/slice';
import recipeArticles from './recipe-article/slice';
import categoryButtons from './category-button/slice';
import optionals from './optional/slice';
import optionalProducts from './optional-product/slice';
import documentTypes from './document-type/slice';
import buttonDetails from './button-detail/slice';
import auth from './auth-user/slice';
import prices from './price/slice';
import modifiers from './modifier/slice';
import modifierProducts from './modifier-product/slice';
import customerSales from './customer-sales/slice';
import submodifiers from './submodifier/slice';
import tiketConfigurations from './tiket-configuration/slice';
import cardSubmodifier from './card-submodifier/slice';
import cardDepmodifier from './card-depmodifier/slice';
import depmodifiers from './depmodifier/slice';
import outputcash from './output-cash-desk/slice';
import cashdesk from './cash-desk-closing/slice';
import salesfordate from './sales-for-date/slice';
import documents from './document/slice';
import sales from './sale/slice';
import prints from './prints/slice';

const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    settings,
    menu,
    authUser,
    category,
    subcategories,
    channels,
    subchannels,
    paymentMethods,
    paymentMethodDetails,
    users,
    customers,
    giftcards,
    discounts,
    restaurants,
    brands,
    employees,
    roles,
    roleDetails,
    articles,
    recipes,
    buttons,
    productDetails,
    products,
    recipeArticles,
    categoryButtons,
    optionals,
    optionalProducts,
    documentTypes,
    buttonDetails,
    auth,
    prices,
    modifiers,
    modifierProducts,
    customerSales,
    submodifiers,
    tiketConfigurations,
    cardSubmodifier,
    cardDepmodifier,
    depmodifiers,
    outputcash,
    cashdesk,
    salesfordate,
    documents,
    sales,
    prints,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
    
});

sagaMiddleware.run(rootSaga);

export default store;
