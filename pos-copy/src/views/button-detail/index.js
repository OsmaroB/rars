import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import SrchButtonDetail from "containers/searchs/SrchButtonDetail";
import Token from "containers/token/Token";
import ButtonDetails from "./button-details";

const ButtonDetail = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.button-detail" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <ButtonDetails />
            </Colxx>
            <Colxx xxs="3">
              <SrchButtonDetail />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default ButtonDetail;