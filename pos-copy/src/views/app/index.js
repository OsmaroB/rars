/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import CutZ from 'views/cut-z';
import CutOutputCash from 'views/cut-output-cash';
import ModalCut from 'views/cut-output-cash/modal';
import CutX from '../cut-x';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Gogo = React.lazy(() => import('./gogo'));
const SecondMenu = React.lazy(() => import('./second-menu'));
const Category = React.lazy(() => import('../category/index'));

const Channel = React.lazy(() => import('../channel'));

const PaymentMethods = React.lazy(() => import('../payment-methods'));

const Users = React.lazy(() => import('../users'));

const Customers = React.lazy(() => import('../customer'));

const Gifcards = React.lazy(() => import('../gifcard'));

const Discounts = React.lazy(() => import('../discount'));

const Restaurants = React.lazy(() => import('../restaurant'));

const Employees = React.lazy(() => import('../employee'));

const Roles = React.lazy(() => import('../role'));

const RoleDetails = React.lazy(() => import('../role-detail'));

const Articles = React.lazy(() => import('../article'));

const Recipes = React.lazy(() => import('../recipe'));

const Buttons = React.lazy(() => import('../button'));

const ProductDetail = React.lazy(() => import('../product-detail'));

const RecipeArticle = React.lazy(() => import('../recipe-article'));

const CategoryButton = React.lazy(() => import('../category-button'));
const Cut = React.lazy(() => import('../cut-x'));
const Codes = React.lazy(() => import('../codes'));
const Product = React.lazy(() => import('../product'));

const Optional = React.lazy(() => import('../optional'));

const OptionalProduct = React.lazy(() => import('../optional-product'));

const DocumentType = React.lazy(() => import('../document-type'));

const ButtonDetail = React.lazy(() => import('../button-detail'));

const CustomerSales = React.lazy(() => import('../customer-sales'));

const Price = React.lazy(() => import('../price'));

const Modifier = React.lazy(() => import('../modifier'));

const ModifierProduct = React.lazy(() => import('../modifier-product'));

const Submodifier = React.lazy(() => import('../submodifiers'));

const Print = React.lazy(() => import('../print'));

const Sale = React.lazy(() => import('../sales'));

const Document = React.lazy(() => import('../documents'));

const TiketConfiguration = React.lazy(() => import('../tiket-configuration'));
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/subway`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            <Route
              path={`${match.url}/category`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/channel`}
              render={(props) => <Channel {...props} />}
            />
            <Route
              path={`${match.url}/payment-methods`}
              render={(props) => <PaymentMethods {...props} />}
            />
            <Route
              path={`${match.url}/users`}
              render={(props) => <Users {...props} />}
            />
            <Route
              path={`${match.url}/cut-x`}
              render={(props) => <CutX {...props} />}
            />
            <Route
              path={`${match.url}/cut-z`}
              render={(props) => <CutZ {...props} />}
            />
            <Route
              path={`${match.url}/cut-output-cash`}
              render={(props) => <CutOutputCash {...props} />}
            />
            <Route
              path={`${match.url}/customers`}
              render={(props) => <Customers {...props} />}
            />
            <Route
              path={`${match.url}/codes`}
              render={(props) => <Codes {...props} />}
            />
            <Route
              path={`${match.url}/discounts`}
              render={(props) => <Discounts {...props} />}
            />
            <Route
              path={`${match.url}/gifcards`}
              render={(props) => <Gifcards {...props} />}
            />
            <Route
              path={`${match.url}/restaurants`}
              render={(props) => <Restaurants {...props} />}
            />
            <Route
              path={`${match.url}/employee`}
              render={(props) => <Employees {...props} />}
            />
            <Route
              path={`${match.url}/role`}
              render={(props) => <Roles {...props} />}
            />
            <Route
              path={`${match.url}/role-detail`}
              render={(props) => <RoleDetails {...props} />}
            />
            <Route
              path={`${match.url}/article`}
              render={(props) => <Articles {...props} />}
            />
            <Route
              path={`${match.url}/recipe`}
              render={(props) => <Recipes {...props} />}
            />
            <Route
              path={`${match.url}/button`}
              render={(props) => <Buttons {...props} />}
            />
            <Route
              path={`${match.url}/product-detail`}
              render={(props) => <ProductDetail {...props} />}
            />
            <Route
              path={`${match.url}/recipe-article`}
              render={(props) => <RecipeArticle {...props} />}
            />
            <Route
              path={`${match.url}/category-button`}
              render={(props) => <CategoryButton {...props} />}
            />
            <Route
              path={`${match.url}/product`}
              render={(props) => <Product {...props} />}
            />
            <Route
              path={`${match.url}/optional`}
              render={(props) => <Optional {...props} />}
            />
            <Route
              path={`${match.url}/optional-product`}
              render={(props) => <OptionalProduct {...props} />}
            />
            <Route
              path={`${match.url}/document-type`}
              render={(props) => <DocumentType {...props} />}
            />
            <Route
              path={`${match.url}/button-detail`}
              render={(props) => <ButtonDetail {...props} />}
            />
            <Route
              path={`${match.url}/customer-sales`}
              render={(props) => <CustomerSales {...props} />}
            />
            <Route
              path={`${match.url}/prices`}
              render={(props) => <Price {...props} />}
            />
            <Route
              path={`${match.url}/modifier`}
              render={(props) => <Modifier {...props} />}
            />
            <Route
              path={`${match.url}/modifier-product`}
              render={(props) => <ModifierProduct {...props} />}
            />
            <Route
              path={`${match.url}/submodifiers`}
              render={(props) => <Submodifier {...props} />}
            />
            <Route
              path={`${match.url}/tiket-configuration`}
              render={(props) => <TiketConfiguration {...props} />}
            />
            <Route
              path={`${match.url}/print`}
              render={(props) => <Print {...props} />}
            />
            <Route
              path={`${match.url}/sales`}
              render={(props) => <Sale {...props} />}
            />
            <Route
              path={`${match.url}/documents`}
              render={(props) => <Document {...props} />}
            />
            
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
