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
import SrchCategory from 'containers/searchs/SrchCategory';
import SrchSubCategory from 'containers/searchs/SrchSubCategory';
import SubCategories from 'views/category/subcategory';
import ListCategories from './list-categories';

const Category = ({ match }) => {
  const [activeTab, setActiveTab] = useState('category');
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORY });
  }, []);

  function NewItem() {
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
  }

  return (
    <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.category" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'category',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('category')}
              >
                <IntlMessages id="menu.category" />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'subcategory',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('subcategory')}
              >
                <IntlMessages id="menu.subcategory" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="category">
              <Row>
                <Colxx xxs="9">
                  <Colxx xxs="12">
                    <ButtonGroup>
                      <Button
                        outline
                        className="float-left"
                        color="primary"
                        onClick={() => {
                          dispatch({ type: ADD_BOOL, category: categories });
                        }}
                      >
                        <div
                          className="glyph-icon simple-icon-plus"
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                      <Button
                        outline
                        className="float-left"
                        color="primary"
                        style={{ fontSize: '15px' }}
                        onClick={() => {
                          dispatch({ type: ADD_BOOL, category: categories });
                        }}
                      >
                        Agregar
                      </Button>
                    </ButtonGroup>
                  </Colxx>
                  <Colxx xxs="12" className="mt-4 mb-4">
                    <NewItem />
                    <ListCategories />
                  </Colxx>
                </Colxx>
                <Colxx xxs="3">
                  <SrchCategory />
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="subcategory">
              <Row>
                <Colxx xxs="9">
                  <SubCategories />
                </Colxx>
                <Colxx xxs="3">
                  <SrchSubCategory />
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};

export default Category;
