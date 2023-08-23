import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchProductDetail from "containers/searchs/SrchProductDetail";
import ProductDetails from "./product-details";

const ProductDetail = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.product-detail" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <ProductDetails />
            </Colxx>
            <Colxx xxs="3">
              <SrchProductDetail />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default ProductDetail;