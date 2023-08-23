import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchOptional from "containers/searchs/SrchOptional";
import Optionals from "./optionals";

const Optional = ({match}) => {
    return(
      <>
      <Token />
      <Row>
        <Colxx xxs="9">
          <Row key="row1">
            <Colxx xxs="12">
              <Breadcrumb heading="menu.optional" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row key="row2">
            <Colxx xss="12">
              <Row>
                <Colxx xxs="12">
                  <Optionals />
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="3">
          <SrchOptional />
        </Colxx>
      </Row>
    </>
  );
};

export default Optional;