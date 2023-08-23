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
import FrmCategory from 'containers/forms/FrmCategory';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY, ADD_BOOL } from 'redux/contants';
// components
import Token from 'containers/token/Token';
import CutCashX from './cutx';
import ModalCashDesk from './modalCashDesk';
import CutZValid from 'containers/token/CutZValid';

const CutX = ({ match }) => {
  const [activeTab, setActiveTab] = useState('category');
  // const [newItem, setNewItem] = useState(false);
  const categories = useSelector((state) => state.category);
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
          <Breadcrumb heading="menu.cut-x" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
          <Colxx xxs="1">
            </Colxx>
            <Colxx xxs="10">
              <CutCashX />
            </Colxx>
            <Colxx xxs="1">
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

export default CutX;
