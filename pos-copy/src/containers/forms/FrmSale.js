import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import {
  CLOSE_FORM_SALE,
  REMOVE_SALE,
  GET_TIKET_CONFIGURATION,
  PRINT_TIKET,
} from 'redux/contants';
import { errorMessage, successMessage } from 'helpers/messages';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { Colxx } from 'components/common/CustomBootstrap';
import { checkCode } from 'apis/user';

const FrmSale = (props) => {
  const { sale } = props;
  const { index } = props;
  const { isCollapse } = props;
  const [collapse, setCollapse] = useState(isCollapse.collapse);
  const [add, setAdd] = useState(true);
  // element in db
  const [correlative] = useState(sale.document.actualCorrelative);
  const [document] = useState(sale.document);
  // const [document] = useState(sale.document);
  const [documentType] = useState(sale.document.documentType.name);
  const [cashRegisterNumber] = useState(sale.cashRegisterNumber);
  const [channel] = useState(sale.channel);
  const [paymentMethod] = useState(sale.paymentMethod);
  const [date] = useState(sale.date);
  const [hour] = useState(sale.hour);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));
  const [employeeName] = useState(cookies.get('employeeName'));

  useEffect(() => {
    dispatch({ type: GET_TIKET_CONFIGURATION });
  }, []);

  const removeFinish = (newStatus, user) => {
    const newData = { ...sale, status: newStatus, userAproved: user };
    dispatch({ type: REMOVE_SALE, sale: newData });
    const tiketData = {
      document,
      tiketConfiguration: tiketConfigurations.allItems,
      employeeName,
      saleID: sale.id,
    };
    dispatch({ 
      type: PRINT_TIKET, 
      tiketData,
      typeTiket:1
    });
    successMessage(
      'Envio de datos exitoso',
      newStatus
        ? 'El item a sido reingresado con exito'
        : 'El item a sido eliminado con exito'
    );
  };

  const removeClick = async () => {
    const getCode = await checkCode({ code });
    if (getCode.data === null) {
      errorMessage(
        'Debes ingresar un código válido para autorizar la operación',
        'Error'
      );
      return;
    }
    // const newStatus = sale.status === 0 ? 1 : 0;
    const newStatus =  1;
    const user = getCode.data.id;
    if (newStatus === 1) {
      Swal.fire({
        title: '¿Estás seguro de hacer una cancelación de venta?',
        text: 'No podra regresar al estadio previo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo eliminarlo',
      }).then((result) => {
        if (result.isConfirmed) {
          removeFinish(newStatus, user);
        }
      });
    }
  };

  const returnFinish = (newStatus, user) => {
    const newData = { ...sale, status: newStatus, userAproved: user };
    dispatch({ type: REMOVE_SALE, sale: newData });
    const tiketData = {
      document,
      tiketConfiguration: tiketConfigurations.allItems,
      employeeName,
      saleID: sale.id,
    };
    dispatch({ 
      type: PRINT_TIKET, 
      tiketData, 
      typeTiket:2 
    });
    successMessage(
      'Envio de datos exitoso',
      newStatus
        ? 'El item a sido reingresado con exito'
        : 'El item a sido eliminado con exito'
    );
  };
  const returnClick = async () => {
    const getCode = await checkCode({ code });
    if (getCode.data === null) {
      errorMessage(
        'Debes ingresar un código válido para autorizar la operación',
        'Error'
      );
      return;
    }
    // const newStatus = sale.status === 0 ? 2 : 0;
    const newStatus =  2;
    const user = getCode.data.id;
    if (newStatus === 2) {
      Swal.fire({
        title: '¿Estás seguro de hacer una devolución de venta?',
        text: 'No podra regresar la venta al estadio previo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo realizar la devolución',
      }).then((result) => {
        if (result.isConfirmed) {
          returnFinish(newStatus, user);
        }
      });
    }
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
              <h3>
                {parseInt(correlative)+1} {date} {hour}
              </h3>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color={sale.status === 0 ? 'theme-3' : 'light'}
              className={`icon-button ml-1 rotate-icon-click ${
                collapse ? 'rotate' : ''
              }`}
              onClick={() => {
                setCollapse(!collapse);
                setAdd(!add);
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
                    <Col sm={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Correlativo</Label>
                        <Input
                          type="text"
                          className="rounded"
                          placeholder=""
                          value={parseInt(correlative)+1}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Caja registradora</Label>
                        <Input
                          type="text"
                          className="rounded"
                          placeholder=""
                          value={cashRegisterNumber}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Tipo de documento</Label>
                        <Input
                          type="text"
                          className="rounded"
                          placeholder=""
                          value={documentType}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Canal de venta</Label>
                        <Input
                          type="text"
                          className="rounded"
                          placeholder=""
                          value={channel}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Método de pago</Label>
                        <Input
                          type="text"
                          className="rounded"
                          placeholder=""
                          value={paymentMethod}
                        />
                      </div>
                    </Col>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-4">
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
                    <Col sm={12} md={12} lg={12}>
                      <div className="text-right">
                        <Button
                          outline
                          color="primary"
                          className="m-1"
                          onClick={() => {
                            dispatch({ type: CLOSE_FORM_SALE });
                          }}
                        >
                          <i className="simple-icon-close btn-group-icon" /> Cerrar
                        </Button>
                        <Button
                          // outline
                          color="primary"
                          className="m-1"
                          onClick={() => {
                            removeClick();
                          }}
                        > Cancelar venta
                        </Button>
                        <Button
                          // outline
                          color="primary"
                          className="m-1"
                          onClick={() => {
                            returnClick();
                          }}
                        > Realizar devolución de venta
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </div>
          </div>
        </Collapse>
      </Card>
    </>
  );
};

export default FrmSale;
