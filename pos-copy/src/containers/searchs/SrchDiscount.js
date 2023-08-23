import { Colxx } from 'components/common/CustomBootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { SEARCH_DISCOUNT } from 'redux/contants';

const SrchDiscount = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const search = (value) => {
    dispatch({ type: SEARCH_DISCOUNT, filter: value });
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Card>
        <Row className="m-2">
          <Colxx xxs="12">
            <Form>
              <FormGroup>
                <div className="mt-3 mb-3">
                  <Label>Buscador</Label>
                  <Input
                    type="text"
                    className="rounded"
                    placeholder="Búsqueda por nombre"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      search(e.target.value);
                    }}
                  />
                </div>
              </FormGroup>
            </Form>
          </Colxx>
        </Row>
      </Card>
    </>
  );
};
export default SrchDiscount;
