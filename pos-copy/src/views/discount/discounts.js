import React from 'react';
import { Row, Button, ButtonGroup } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_DISCOUNT } from 'redux/contants';
import ListDiscounts from './list-discounts';
// Components
// import ListUsers from './list-channels';

const Discount = () => {
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
                dispatch({ type: OPEN_FORM_DISCOUNT });
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
                dispatch({ type: OPEN_FORM_DISCOUNT });
              }}
            >
              Agregar
            </Button>
          </ButtonGroup>
        </Colxx>
        <Colxx xxs={12} className="mt-4 mb-4">
          <ListDiscounts />
        </Colxx>
      </Row>
    </>
  );
};

export default Discount;
