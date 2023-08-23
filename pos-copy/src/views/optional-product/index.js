import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchOptionalProduct from "containers/searchs/SrchOptionalProduct";
import OptionalProducts from "./optional-products";

const OptionalProduct = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.optional-product" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <OptionalProducts />
            </Colxx>
            <Colxx xxs="3">
              <SrchOptionalProduct />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default OptionalProduct;