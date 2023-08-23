/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import { addCode} from 'apis/user';
import { Colxx } from 'components/common/CustomBootstrap';
import successMessage, { errorMessage } from 'helpers/messages';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { CLOSE_FORM_CODE } from 'redux/contants';

const { Card, Button, Collapse, Form, FormGroup, Row, Label, Input } = require('reactstrap');

const FrmCode = (props) => {
    const {code} = props;
    const { isCollapse } = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [codeAu,setCodeAu]=useState(code.code)
    const {index} = props;
    const dispatch=useDispatch();
    const updateClick = async() => {
        if(codeAu===null || codeAu===0 || codeAu===''){
            errorMessage('El código no es válido','Error');
            return;
        }
        const newData = {
          id:code.id,
          code:codeAu
        };
        await addCode(newData);
          successMessage(
            'Envio de datos exitoso',
            'El item a sido actualizado con exito'
          );
          dispatch({ type: CLOSE_FORM_CODE });
      };
  return (
    <>
      <Card className="question d-flex mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
              <span className="heading-number d-inline-block mt-2 mb-2">
                {index}
              </span>
              <h3>Usuario: {code.email}</h3>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color={code.status === 0 ? 'theme-3' : 'light'}
              className={`icon-button ml-1 rotate-icon-click ${
                collapse ? 'rotate' : ''
              }`}
              onClick={() => {
                setCollapse(!collapse);
              }}
            >
              <i className="simple-icon-arrow-down" />
            </Button>
          </div>
        </div>
        <Collapse isOpen={collapse}>
          <div className="card-body pt-0">
            <div className="edit-mode">
              <Form>
                <FormGroup>
                  <Row>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Código de autorización</Label>
                        <Input
                          type="password"
                          className="rounded"
                          placeholder="Código de autorización"
                          value={codeAu}
                          onChange={(e) => {
                            setCodeAu(e.target.value);
                          }}
                        />
                      </div>
                    </Colxx>
                  </Row>
                  <div className="text-right">
                    <Button
                      outline
                      color="primary"
                      className="m-1"
                      onClick={() => {
                        dispatch({ type: CLOSE_FORM_CODE });
                      }}
                    >
                      <i className="simple-icon-close btn-group-icon" />{' '}
                      Cancelar
                    </Button>
                    <Button
                      // outline
                      color="primary"
                      className="m-1"
                      onClick={() => {
                          updateClick();
                      }}
                    >
                      <i className="simple-icon-plus btn-group-icon" /> Guardar
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        </Collapse>
      </Card>
    </>
  );
};
export default FrmCode;
