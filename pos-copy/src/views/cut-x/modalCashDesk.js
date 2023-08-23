/* eslint-disable react/jsx-filename-extension */
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Token from 'containers/token/Token';
import validation from 'containers/validations/ValidationOutput';
import globalFunctions from 'helpers/globalFunctions';
import successMessage, { errorMessage, warningMessage } from 'helpers/messages';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'reactstrap-date-picker';
import getDay from 'react-datepicker';
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
import { START_CASH_DESK_CLOSING, GET_TIKET_CONFIGURATION } from 'redux/contants';
import Cookies from 'universal-cookie';
import { checkCode } from 'apis/user';

const ModalCashDesk = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(true);
  const [time, setTime] = useState('');
  const [code, setCode] = useState('');
  const [salesDate, setSalesDate] = useState(false);
  const [dateStart, setDateStart] = useState('');
  
  const toggle = () => {
    setModal(!modal);
  };
  setInterval(()=>{
    const time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    setTime(time);  
  },1000)
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));
  useEffect(() => {
    dispatch({ type: GET_TIKET_CONFIGURATION });
    CalendarForSale();
  }, []);
  const [prettyCash, setPrettyCash] = useState(0);
  const cashdeskclosing = useSelector((state) => state.cashdesk);
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);

  // in function 
  // e:eventclick, 
  // type: 0 = start cashdesk with calendar: 1 = start cashdesk now 
  const onSubmit = async(e,type) => {
    // no reload page
    e.preventDefault();

    const openCashDesk = (currentDate) =>{
      const newCashDesk = {
        prettyCash,
        cashRegister: (tiketConfigurations.allItems)[0].cashRegisterNumber,
        date: currentDate,
        userCreate: userID,
        userID,
      };
      dispatch({ type: START_CASH_DESK_CLOSING, cashdeskclosing: newCashDesk });
      localStorage.setItem('prettycash', prettyCash);
      localStorage.setItem('dateSales', moment().format('YYYY-MM-DD'));
      successMessage(
        'Envio de datos exitoso',
        'Se ha aperturado la caja correctamente'
      );
      toggle();
    }

    if(prettyCash<1){
      errorMessage('Ingresa una cantidad válida','Error');
      return;
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    if(dateStart != ''){
      currentDate = moment(dateStart).format('YYYY-MM-DD');
    }

    if(salesDate.length > 0 && type == 0){
      const getCode = await checkCode({ code });
      if (getCode.data === null) {
        errorMessage(
          'Debes ingresar un código válido para autorizar la operación',
          'Error'
        );
        return;
      }else{
        if(currentDate == salesDate[0] || currentDate == salesDate[salesDate.length - 1]){
          openCashDesk(currentDate);
        }else{
          warningMessage('', 'Debes seleccionar el ultimo día o el primero para aperturar caja')
        }
      }
    }else if(salesDate.length > 0 && type == 1){
      const getCode = await checkCode({ code });
      if (getCode.data === null) {
        errorMessage(
          'Debes ingresar un código válido para autorizar la operación',
          'Error'
        );
        return;
      }else{
        openCashDesk(currentDate);
      }
    }else{
      openCashDesk(currentDate);
    }
  };

  const CalendarForSale = async () =>{
    const dates = [];
    var days = 0;
    var rep = 0;
    let result = true;
    while (result) {
      try {
        let date, dateFront;
        if(dates.length == 0 && days == 0){
          console.log(days);
          date = "";
          dateFront = "";
        }else{
          date = moment().subtract(days, 'days').format('YYYY-MM-DD 00:00:00.0000000 +00:00');
          dateFront = moment().subtract(days, 'days').format('YYYY-MM-DD');
        }
        days++;
        rep++;
        const res = await globalFunctions.salesForDate(date);
        if(!res){
          dates.push(dateFront);
        }
        if(rep > 5){
          result = !res;
        }
      } catch (error) {
        console.log(error);
      }
    }
    setSalesDate(dates);
  };

  return (
    <>
      <Row>
        <Colxx xxs={12} lg={12}>
          <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop={false}
            size="lg"
            modalTransition={{ timeout: 500 }}
          >
            <ModalHeader>Apertura de caja Fecha y hora actual: {time}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Row>
                    <Colxx xss={12} xs={12} md={12} lg={12}>
                      <Row>
                        <Colxx xxs={12} xs={12} md={6} lg={4}>
                          <div className="mt-2 mb-2">
                            <Label>Monto de apertura de caja</Label>
                            <Input
                              type="number"
                              onKeyPress={(event) => {
                                if (!/^[0-9\.]*$/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              className="rounded"
                              min={0}
                              step={0.01}
                              placeholder="Cantidad"
                              value={prettyCash}
                              onChange={(e) => {
                                setPrettyCash(e.target.value);
                              }}
                            />
                          </div>
                        </Colxx>
                        <Colxx 
                          hidden={salesDate.length == 0}
                        xxs={12} xs={12} md={6} lg={4}>
                          <div className="mt-2 mb-2">
                            <Label>Fecha</Label>
                            <DatePicker
                              id="example-datepicker"
                              autoComplete="off"
                              value={dateStart}
                              minDate={salesDate.length > 0 ? new Date(moment(salesDate[salesDate.length - 1])): new Date(moment())}
                              maxDate={salesDate.length > 0 ? new Date(moment(salesDate[0])): new Date(moment())}
                              dateFormat="YYYY-MM-DD"
                              placeholder="Ingresa la fecha"
                              onChange={(v, f) => {
                                setDateStart(f != null ? moment(f): '');
                              }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs={12} xs={12} md={6} lg={4}
                          hidden={salesDate.length == 0}
                        >
                          <div className="mt-2 mb-2">
                            <Label>Código de autorización</Label>
                            <Input
                              type="password"
                              value={code}
                              className="rounded"
                              placeholder="Código de autorización"
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
                      // outline
                      type="submit"
                      color="primary"
                      className="m-1"
                      onClick={(e) => onSubmit(e,0)}
                    >
                      <i className="simple-icon-plus btn-group-icon" /> Aperturar caja
                    </Button>
                    <Button
                      // outline
                      type="submit"
                      color="secondary"
                      className="m-1"
                      onClick={(e) => onSubmit(e,1)}
                    >
                      <i className="simple-icon-plus btn-group-icon" /> Aperturar caja hoy
                    </Button>
                    <Button
                    outline
                      onClick={(e)=>{
                        e.preventDefault();
                        history.push('/app/subway/welcome');
                      }}  
                      className="m-1"
                      color="primary"
                    >
                      <i className="simple-icon-plus btn-group-icon" /> Cancelar
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
export default ModalCashDesk;
