/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Col,
  ButtonDropdown,
  Button
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// import IntlMessages from 'helpers/IntlMessages';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from 'redux/actions';

import {
  searchPath,
  localeOptions,
  isDarkSwitchActive,
  adminRoot,
} from 'constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from 'components/svg';
import { getDirection, setDirection } from 'helpers/Utils';
import TopnavDarkSwitch from './Topnav.DarkSwitch';
import { errorMessage } from 'helpers/messages';
import globalFunctions from 'helpers/globalFunctions';
import { 
  SET_CLIENT_MODAL_CUSTOMER_SALES, 
  SET_DISCOUNT_MODAL_CUSTOMER_SALES, 
  SET_ORDER_MODAL_CUSTOMER_SALES, 
} from 'redux/contants';

const TopNav = ({
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  changeLocaleAction,
}) => {

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userName = cookies.getAll().employeeName;
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const customerSales = useSelector((state) => state.customerSales);


  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    if (localStorage.getItem('idcashdesk')) {
      errorMessage('r el corte x','Error');
      history.push('/app/cut-x');
      return;
    }
    globalFunctions.logout();
    history.push('/user/login');
    window.location.reload();
    window.location.reload();
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };


  const ButtonOptions = () => {
    const {pathname} = window.location;
    if(pathname == '/app/customer-sales'){
      return(
        <>
          <Col sm="6" className="mt-2">
            <Button
              color='primary'
              outline
              className="btn btn-header btn-sm mx-1"
              style={{
                width:'130px',
                margin: '0',
                paddingTop: '2px',
                paddingBottom: '2px',
              }}
              onClick={() => {
                dispatch({
                  type: SET_CLIENT_MODAL_CUSTOMER_SALES,
                  status: !customerSales.clientModal,
                });
              }}
            >
              Agregar cliente
            </Button>
          </Col>
          <Col sm="6" className="mt-2">
            <Button
              color='primary'
              outline
              className="btn btn-sm mx-1"
              style={{
                width:'120px',
                margin: '0',
                paddingTop: '2px',
                paddingBottom: '2px',
              }}
              onClick={() => {
                dispatch({
                  type: SET_ORDER_MODAL_CUSTOMER_SALES,
                  status: !customerSales.ordersModal,
                });
              }}
            >
              Agregar orden
            </Button>
          </Col>
          {/* <ButtonDropdown
              className="mt-2"
              isOpen={dropDownState}
              toggle={() => setDropDownState(!dropDownState)}
            >
              <div className="">
                <DropdownToggle
                  color="primary"
                  outline
                  className="btn btn-sm mx-1"
                  style={{
                    margin: '0',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                  }}
                  caret
                >
                  Opciones
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    key="drp-option-1"
                    onClick={() => {
                      dispatch({
                        type: SET_CLIENT_MODAL_CUSTOMER_SALES,
                        status: !customerSales.clientModal,
                      });
                    }}
                  >
                    Agregar cliente
                  </DropdownItem>
                  <DropdownItem
                    key="drp-option-2"
                    onClick={() => {
                      dispatch({
                        type: SET_ORDER_MODAL_CUSTOMER_SALES,
                        status: !customerSales.ordersModal,
                      });
                    }}
                  >
                    Agregar Orden
                  </DropdownItem>
                  <DropdownItem
                    key="drp-option-3"
                    onClick={() => {
                      dispatch({
                        type: SET_DISCOUNT_MODAL_CUSTOMER_SALES,
                        status: !customerSales.disccountsModal,
                      });
                    }}
                  >
                    Agregar Cupón
                  </DropdownItem>
                </DropdownMenu>
              </div>
            </ButtonDropdown> */}
        </>
      )
    }
    return(<></>)
  }

  // const { messages } = intl;
  return (
    <nav className="navbar fixed-top"
    >
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        {/* <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
      </div>
      <NavLink className="navbar-logo" to={adminRoot}>
        {/* <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" /> */}
      </NavLink>

      <div className="navbar-right">
        {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}
        <div className='d-inline-block'>
          <ButtonOptions/>
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">{userName}</span>
              <span>
                {/* <div className="glyph-icon iconsminds-male-2"> </div> */}
              </span>
            </DropdownToggle>
            <DropdownMenu className="" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    // logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
