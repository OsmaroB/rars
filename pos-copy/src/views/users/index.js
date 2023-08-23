import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from 'containers/token/Token';
import SrchUser from 'containers/searchs/SrchUser';
import User from './users';

const Users = ({ match }) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.users" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <User />
            </Colxx>
            <Colxx xxs="3">
              <SrchUser />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

export default Users;
