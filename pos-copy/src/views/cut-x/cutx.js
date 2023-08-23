/* eslint-disable react/jsx-filename-extension */
import { Colxx } from 'components/common/CustomBootstrap';
import { Container } from 'reactstrap';
import FrmCutX from 'containers/forms/FrmCutX';
import React from 'react';
import { Row } from 'reactstrap';

const CutCashX = () => {
  return (
    <>
      <Row>
        <Colxx xxs={12}>
          <Container>
            <FrmCutX />
          </Container>
        </Colxx>
      </Row>
    </>
  );
};
export default CutCashX;
