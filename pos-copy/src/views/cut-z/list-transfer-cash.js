/* eslint-disable react/jsx-filename-extension */
import { Colxx } from 'components/common/CustomBootstrap';
import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';

const ListCash = () => {
  return (
    <>
      <Card className="question d-flex mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
            <div className="list-item-heading mb-0 truncate w-100 mb-1 mt-1">
              <h3>Lista de retiros de efectivo </h3>
            </div>
          </div>
          <div className="card-body pt-0">
          <div className="edit-mode">
            <Row>
              <Colxx xss={12} xs={12} md={12} lg={12}>
                <Row>
                  <Colxx xxs="12">
                    <ul>
                    <li>
                      {localStorage.getItem('cashSerfinsa')}
                    </li>
                    </ul>
                    </Colxx>
                    </Row>
                    </Colxx>
                    </Row>
                    </div>
                    </div>
        </div>
      </Card>
    </>
  );
};

export default ListCash;
