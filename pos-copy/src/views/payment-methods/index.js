import React, { useState } from "react";
import { 
    Row, 
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
  } from 'reactstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchPaymentMethod from "containers/searchs/SrchPaymentMethod";
import SrchPaymentMethodDetail from "containers/searchs/SrchPaymentMethodDetail";
import PaymentMethod from "./payment-methods";   
import PaymentMethodDetail from "../payment-method-details/payment-method-details";

const PaymentMethods = ({match}) => {
    const [activeTab, setActiveTab] = useState('payment-methods');

    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.payment-methods" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Nav tabs className='separator-tabs ml-0 mb-5'>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'payment-methods',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('payment-methods')}
              >
                  <IntlMessages id="menu.payment-methods" />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'details-payment-methods',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('details-payment-methods')}
              >
                <IntlMessages id="menu.details-payment-methods" />
              </NavLink>
            </NavItem>
            
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="payment-methods">
              <Row>
                <Colxx xxs="9">
                  <PaymentMethod />
                </Colxx>
                <Colxx xxs="3">
                  <SrchPaymentMethod />
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="details-payment-methods">
              <Row>
                <Colxx xxs="9">
                  {/* <h1>Payment detail</h1> */}
                  <PaymentMethodDetail />
                </Colxx>
                <Colxx xxs="3">
                  {/* <h1>Buscador</h1> */}
                  <SrchPaymentMethodDetail />
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};

export default PaymentMethods;