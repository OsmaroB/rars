import React from 'react';
import { Row, Button, ButtonGroup } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { OPEN_FORM_USER } from 'redux/contants';
// Components
import ListUsers from './list-users';

const User = () => {
  const dispatch = useDispatch();

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Row>
        <Colxx xxs={12}>
          <ButtonGroup>
            <Button
              outline
              className="float-left"
              color="primary"
              onClick={() => {
                dispatch({ type: OPEN_FORM_USER });
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
                dispatch({ type: OPEN_FORM_USER });
              }}
            >
              Agregar
            </Button>
          </ButtonGroup>
        </Colxx>
        <Colxx xxs={12} className="mt-4 mb-4">
          <ListUsers />
        </Colxx>
      </Row>
    </>
  );
};

export default User;
