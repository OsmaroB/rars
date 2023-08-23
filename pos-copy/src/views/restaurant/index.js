import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchRestaurant from "containers/searchs/SrchRestaurant";
import Restaurant from "./restaurant";

const Restaurants = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.restaurants" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <Restaurant />
            </Colxx>
            <Colxx xxs="3">
              <SrchRestaurant />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default Restaurants;