/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from 'containers/token/Token';
import SrchDiscount from 'containers/searchs/SrchDiscount';
import Discount from './discounts';

const Discounts = ({ match }) => {
  return (
    <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.discounts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <Discount />
            </Colxx>
            <Colxx xxs="3">
              <SrchDiscount />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

export default Discounts;
