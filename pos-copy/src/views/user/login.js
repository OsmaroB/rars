import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { loginUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { POST_AUTH_USER, GET_TIKET_CONFIGURATION } from 'redux/contants';
import { useDispatch, connect, useSelector } from 'react-redux';
import { warningMessage } from 'helpers/messages';
import globalFunctions from 'helpers/globalFunctions';
import fullScreen from 'helpers/fullScreen';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = (props, { loading, error }) => {
  const cookies = new Cookies();
  const [email] = useState('');
  const [password] = useState('');
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // fullScreen();
    if (auth.error !== '') {
      setLoad(false);
      warningMessage('Inicio de sesión fallido', auth.error);
    }
    if (auth.allItems.token !== '' && auth.allItems.token !== undefined) {
      globalFunctions.clearSpecial();
      // cookies.set('roleDetaildf', JSON.stringify(auth.allItems.roleDetail), { path: '/' });
      cookies.set('userToken', auth.allItems.token, { path: '/' });
      // cookies.set('role', auth.allItems.roleDetail, { path: '/' });
      localStorage.setItem('roleDetail', JSON.stringify(auth.allItems.roleDetail));
      localStorage.setItem('roleID', auth.allItems.roleID);
      cookies.set('userID', auth.allItems.userID, { path: '/' });
      cookies.set('employeeName', auth.allItems.employeeName, { path: '/' });
      cookies.set('statusPage', 0, { path: '/' });
      var dateSesion = moment().add(20, 'hours').format('YYYY-MM-DD');
      var hourSesion = moment().add(20, 'hours').format('HH:mm');
      localStorage.setItem('hourSesion', JSON.stringify(hourSesion));
      localStorage.setItem('dateSesion', JSON.stringify(dateSesion));
      // console.log(newElement)
      props.history.push('/app/subway/welcome');
    }
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error, auth.error, auth.allItems]);

  const onUserLogin = (values) => {
    // fullScreen();
    fullScreen.fullScreen();
    setLoad(true);
    // if (!loading) {
      if (values.email !== '' && values.password !== '') {
        const data = {
          email: values.email,
          password: values.password,
        };
        dispatch({ type: POST_AUTH_USER, authUser: data });
        dispatch({type:GET_TIKET_CONFIGURATION});
      }
    // }
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

  const docElm = document.documentElement;
  // const fullScreen = () =>{
  //   if (docElm.requestFullscreen) {
  //     docElm.requestFullscreen();
  //   } else if (docElm.mozRequestFullScreen) {
  //     docElm.mozRequestFullScreen();
  //   } else if (docElm.webkitRequestFullScreen) {
  //     docElm.webkitRequestFullScreen();
  //   } else if (docElm.msRequestFullscreen) {
  //     docElm.msRequestFullscreen();
  //   }
  // }

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2"></p>
            {/* <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p> */}
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <h3>JARVIS POS</h3>
              {/* <span className="logo-single" /> */}
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      {/* <IntlMessages id="user.forgot-password-question" /> */}
                    </NavLink>
                    <Button
                      type='submit'
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        load ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
