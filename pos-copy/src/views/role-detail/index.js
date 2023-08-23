import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrcRoleDetail from "containers/searchs/SrcRoleDetail";
import RoleDetail from "./role-details";

const RoleDetails = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.role-detail" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <RoleDetail />
            </Colxx>
            <Colxx xxs="3">
              <SrcRoleDetail />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default RoleDetails;