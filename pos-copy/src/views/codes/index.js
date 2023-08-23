/* eslint-disable react/jsx-filename-extension */
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import SrchCode from 'containers/searchs/SrchCode';
import React from 'react';
import { Breadcrumb, Row } from 'reactstrap';
import Code from './code';

const Codes = ({ match }) => {
  return (
    <>
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.codes" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <Code />
            </Colxx>
            <Colxx xxs="3">
              <SrchCode />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default Codes;
