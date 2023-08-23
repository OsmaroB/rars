/* eslint-disable react/jsx-filename-extension */
import { Colxx } from 'components/common/CustomBootstrap';
import FrmCutZ from 'containers/forms/FormCutZ';
import FrmCutX from 'containers/forms/FrmCutX';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import ListCash from './list-transfer-cash';
// falta el de prettycash
const CutCashZ = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <>
      <Row>
          <FrmCutZ />
      </Row>
    </>
  );
};
export default CutCashZ;
