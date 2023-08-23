/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { updateCashDeskClosing } from 'apis/cash-desk-closing';
import { checkCode } from 'apis/user';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Token from 'containers/token/Token';
import validation from 'containers/validations/ValidationOutput';
import successMessage, { errorMessage } from 'helpers/messages';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import {
  ADD_OUTPUT_CASH_DESK,
  GET_TIKET_CONFIGURATION,
  UPDATE_CASH_DESK_CLOSING,
  PRINT_OUTPUT_CASH,
  UPDATE_PRETTY_CASH_DESK_CLOSING,
} from 'redux/contants';
import { get } from 'sortablejs';
import Cookies from 'universal-cookie';


const ModalCut = () => {
  const history = useHistory();
  const [modal, setModal] = useState(true);
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));
  const [employeeName] = useState(cookies.get('employeeName'));
  const [output, setOutput] = useState(0.01);
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const outputcash = useSelector((state) => state.outputcash);
  const cashdeskclosing = useSelector((state) => state.cashdesk);
  
  const dispatch = useDispatch();
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);
  useEffect(()=>{
    dispatch({type: GET_TIKET_CONFIGURATION});
  },[])

  const toggle = () => {
    setModal(!modal);
    history.push('/app/subway/welcome');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const getCode = await checkCode({ code });
    if (getCode.data === null) {
      errorMessage(
        'Debes ingresar un código válido para autorizar la operación',
        'Error'
      );
      return;
    }
    if (JSON.parse(localStorage.getItem('prettycash')) - output < 0) {
      errorMessage(
        'La cantidad a retirar sobrepasa el efectivo en caja',
        'Error'
      );
      return;
    }
    const newOutput = {
      ...outputcash,
      output,
      description,
      cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
      userCreate: userID,
      userID,
      userAproved: getCode.data.id,
    };
    if (validation.data(newOutput)) {
      dispatch({ type: ADD_OUTPUT_CASH_DESK, outputscashdesk: newOutput });
      successMessage(
        'Envio de datos exitoso',
        'El retiro se ha agregado con éxito'
      );
      toggle();
    }
    let newCashDesk = null;
    newCashDesk = {
      prettyCash: JSON.parse(localStorage.getItem('prettycash')) - output,
      id: JSON.parse(localStorage.getItem('idcashdesk')),
    };
    dispatch({
      type: UPDATE_PRETTY_CASH_DESK_CLOSING,
      cashdesk: newCashDesk,
    });
    dispatch({
      type:PRINT_OUTPUT_CASH, 
      tiketConfigurations: tiketConfigurations.allItems,
      employeeName,
      description,
      outputCash:output,
      totalOutputCashDesk:JSON.parse(localStorage.getItem('prettycash')) - output,

    })
    localStorage.setItem('prettycash', newCashDesk.prettyCash);
  };


  return (
    <>
      <Row>
        <Colxx xxs={12} lg={12}>
          <Modal
            isOpen={modal}
            toggle={toggle}
            size="lg"
            modalTransition={{ timeout: 500 }}
          >
            <ModalHeader>Salida de caja</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Row>
                    <Colxx xss={12} xs={12} md={12} lg={12}>
                      <Row>
                        <Colxx xxs={12} xs={12} md={12} lg={12}>
                          <div className="mt-2 mb-2">
                            <Label>Descripción</Label>
                            <Input
                              type="textarea"
                              className="rounded"
                              placeholder="Motivo del retiro"
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                          <div className="mt-2 mb-2">
                            <Label>Monto a retirar</Label>
                            <Input
                              type="number"
                              className="rounded"
                              onKeyPress={(event) => {
                                if (!/^[0-9\.]*$/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              min={0.01}
                              step={0.01}
                              placeholder="Cantidad"
                              value={output}
                              onChange={(e) => {
                                setOutput(e.target.value);
                              }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs={12} xs={12} md={12} lg={12}>
                          <div className="mt-2 mb-2">
                            <Label>Código de autorización</Label>
                            <Input
                              type="password"
                              className="rounded"
                              placeholder="Código de autorización"
                              value={code}
                              onChange={(e) => {
                                setCode(e.target.value);
                              }}
                            />
                          </div>
                        </Colxx>
                      </Row>
                    </Colxx>
                  </Row>
                  <div className="text-right">
                    <Button
                      outline
                      color="primary"
                      className="m-1"
                      onClick={() => toggle()}
                    >
                      <i className="simple-icon-close btn-group-icon" />{' '}
                      Cancelar
                    </Button>
                    <Button
                      // outline
                      type="submit"
                      color="primary"
                      className="m-1"
                      onClick={(e) => onSubmit(e)}
                    >
                      <i className="simple-icon-plus btn-group-icon" /> Guardar
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </Colxx>
      </Row>
    </>
  );
};
export default ModalCut;
