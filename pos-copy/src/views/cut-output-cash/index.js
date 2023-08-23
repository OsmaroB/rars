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
import ModalCut from './modal';
import CutZValid from 'containers/token/CutZValid';

const CutOutputCash = ({ match }) => {
  const [activeTab, setActiveTab] = useState('category');
  // const [newItem, setNewItem] = useState(false);
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORY });
  }, []);

  /*  function NewItem() {
    if (categories.addItem) {
      return (
        <>
          <FrmCategory
            category={{ ...categories.newItem, collapse: true }}
            index=""
          />
        </>
      );
    }
    return <></>;
  } */

  return (
    <>
      <Token />
      <CutZValid />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.cut-output-cash" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <ModalCut />
        </Colxx>
      </Row>
    </>
  );
};

export default CutOutputCash;
