import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchPrice from "containers/searchs/SrchPrice";

// import Products from "./products";
import Prices from "./prices";

const Price = ({match}) => {
    return(
      <>
      <Token />
      <Row>
        <Colxx xxs="9">
          <Row key="row1">
            <Colxx xxs="12">
              <Breadcrumb heading="menu.price" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row key="row2">
            <Colxx xss="12">
              <Row>
                <Colxx xxs="12">
                  <Prices />
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="3">
          <SrchPrice />
        </Colxx>
      </Row>
    </>
  );
};

export default Price;