/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  ButtonGroup,
} from 'reactstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY, ADD_BOOL } from 'redux/contants';
// components
import Token from 'containers/token/Token';
import CutCashZ from './cutz';
import CutZValid from 'containers/token/CutZValid';

const CutZ = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORY });
  }, []);
  return (
    <>
      <Token />
      <CutZValid />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.cut-z" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="12">
              <CutCashZ />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

export default CutZ;
