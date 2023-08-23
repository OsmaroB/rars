import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import Configuration from "./configuration";

const Configurations = ({match}) => {
    return(
      <>
      <Token />
      <Row>
        <Colxx xxs="12">
          <Row key="row1">
            <Colxx xxs="12">
              <Breadcrumb heading="menu.tiket-configuration" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row key="row2">
            <Colxx xss="12">
              <Row>
                <Colxx xxs="12">
                  <Configuration />
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

export default Configurations;