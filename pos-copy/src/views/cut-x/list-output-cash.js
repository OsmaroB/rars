/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Card, CardBody, Row } from 'reactstrap';
import { GET_OUTPUT_CASH_FOR_CUT, GET_OUTPUT_CASH_FOR_CUT_AND_STATUS } from 'redux/contants';

const ListOutputCash = () => {
  const outputcash = useSelector((state) => state.outputcash);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const cashdeskclosing = useSelector((state) => state.cashdesk);
  const cashDeskClosingID = {
    // cashDeskClosingID: cashdeskclosing.allItems.id,
    cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
    status:0
  };
  useEffect(() => {
    dispatch({
      type: GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
      outputscashdesk: cashDeskClosingID,
    });
  }, []);
  useEffect(() => {
    let subtotal = 0;
    outputcash.allItems.forEach((element) => {
      subtotal += element.output;
    });
    setTotal(subtotal);
  }, [outputcash]);
  return (
    <>
      <Card className="question d-flex mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
              <span className="heading-number d-inline-block mt-1 mb-2" />
              <h3>Lista de retiros de efectivo </h3>
            </div>
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="edit-mode">
            <Row>
              <Colxx xss={12} xs={12} md={12} lg={12}>
                <Row>
                  <Colxx xxs="12">
                    <ul>
                      {outputcash.allItems.length !== 0 ? (
                        outputcash.allItems.map((item, index) => (
                          <li key={item.id}>
                            <h6>
                              {item.description}, costó: ${item.output}
                            </h6>
                          </li>
                        ))
                      ) : (
                        <p>Este corte no cuenta con retiros</p>
                      )}
                    </ul>
                    {outputcash.allItems.length !== 0 ? (
                      <h6 className="mt-5">Total retirado: ${total}</h6>
                    ) : (
                      ''
                    )}
                  </Colxx>
                </Row>
              </Colxx>
            </Row>
          </div>
        </div>
      </Card>
    </>
  );
};
export default ListOutputCash;
