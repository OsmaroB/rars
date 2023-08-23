import React, { useState } from 'react';
import { 
  Row, 
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// Components
import Token from "containers/token/Token";
import SrchChannel from 'containers/searchs/SrchChannel';
import SrchSubChannel from 'containers/searchs/SrchSubChannel';
import Channel from './channel';
import SubChannel from '../subchannel/subchannel';

const Index = ({match}) => {

  const [activeTab, setActiveTab] = useState('channel');


  return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.channel" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Nav tabs className='separator-tabs ml-0 mb-5'>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'channel',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('channel')}
              >
                  <IntlMessages id="menu.channel" />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'subchannel',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('subchannel')}
              >
                <IntlMessages id="menu.subchannel" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="channel">
              <Row>
                <Colxx xxs="9">
                  <Channel />
                </Colxx>
                <Colxx xxs="3">
                  <SrchChannel />
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="subchannel">
              <Row>
                <Colxx xxs="9">
                  <SubChannel /> 
                </Colxx>
                <Colxx xss="3">
                  ubscador
                  <SrchSubChannel />
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  )
};


export default Index;