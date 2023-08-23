/* eslint-disable prettier/prettier */
/* eslint-disable no-lonely-if */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */

import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { DatePicker } from 'reactstrap-date-picker';
import Swal from "sweetalert2";
import {
  GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
  GET_PAYMENT_METHOD_DETAIL,
  GET_SUBCHANNEL,
  GET_TIKET_CONFIGURATION,
  PRINT_CUT_X,
  PRINT_REPORT_CUT
} from 'redux/contants';
import {
  getSalesfordateChannel,
  getSalesfordatePayment,
} from 'apis/sales-for-date';
import { addDetailSubchannelCashClosing } from 'apis/detail-subchannel-method-cash-closing';
import { addDetailPaymentMethodCashClosing } from 'apis/detail-payment-method-cash-closing';
import Cookies from 'universal-cookie';
import { addReport } from 'apis/report-cash-desk-closing';
import { updateCashCashDeskClosing, updateCashDeskClosing } from 'apis/cash-desk-closing';
import { useHistory } from 'react-router-dom';
import successMessage, { errorMessage } from 'helpers/messages';
import { cancel } from 'redux-saga/effects';
import validation from '../validations/ValidationCutX';
import { getSalesForCut } from 'apis/sales';
import moment from 'moment';

const FrmCutX = () => {
  // 
  const history = useHistory();
  const dispatch = useDispatch();
  const [cashRegister, setCashRegister] = useState(0);
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);
  const subchannels = useSelector((state) => state.subchannels);
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));
  const [employeeName] = useState(cookies.get('employeeName'));
  const paymentMethodDetails = useSelector((state) => state.paymentMethodDetails);
  const [datevalue, setDateValue] = useState(null);
  const [fmtValue, setFmtValue] = useState(undefined);
  const [step, setStep] = useState({}); 
  const outputcash = useSelector((state) => state.outputcash);

  
  const cancelCut=async()=>{
    history.push('/app/subway/welcome');
  }

  // FUNTION SUBMIT USE
  // actualizar fondo de caja basicamente y ver como redireccionar y reiniciar var
  // actualizar estado de retiros
  const submit = async (e) => {
    localStorage.setItem('print', false);
    let coincidir = true;
    e.preventDefault();
    const data = {
      date: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): fmtValue,
      prettycash: cashRegister,
    };
    if (!validation.add(data)) {
      return;
    }
    const { methods } = e.target.elements;
    const { channels } = e.target.elements;
    if (!validation.report(methods, channels)) {
      return;
    }
    let sumaventas = 0;
    const salesBody = {
      paymentMethod: 'Dolar estadounidense',
      date: localStorage.getItem('dateSales')?
      `${localStorage.getItem('dateSales')} 00:00:00.0000000 +00:00`:`${fmtValue} 00:00:00.0000000 +00:00`,
      cashRegisterNumber:(tiketConfigurations.allItems)[0].cashRegisterNumber,
      cutX: JSON.parse(localStorage.getItem('idcashdesk')),
    };
    let moneyData = 0;
    const money = await getSalesfordatePayment(salesBody);
    money.data.forEach((mon) => {
      moneyData += mon.totalWithTax;
    });
    let outputlist = 0;
    outputcash.allItems.forEach((out) => {
      outputlist += out.output;
    });
    // sumaventas = JSON.parse(localStorage.getItem('prettycash')) + moneyData;
    sumaventas = JSON.parse(localStorage.getItem('prettycash'));
    if (cashRegister != sumaventas) {
      localStorage.setItem(
      'errorPretty',
      JSON.stringify(cashRegister - sumaventas)
      );
      coincidir = false;
      await toggle();
      return
    }

    // filter paymentMethod details in status:0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })
    // filter subchannel with status:0
    const filterSubchannel = (subchannels.allItems).filter((subchannel)=>{
      return subchannel.status == 0;
    })

    filterPaymentMethodDetails.forEach(async (element, index) => {
      const dateMoment = moment(localStorage.getItem('dateSales')).format("YYYY-MM-DD")
      const paymentsBody = {
        paymentMethod: element.name,
        date:  localStorage.getItem('dateSales')?
        `${dateMoment} 00:00:00.0000000 +00:00`:`${fmtValue} 00:00:00.0000000 +00:00`,
        cashRegisterNumber: (tiketConfigurations.allItems)[0].cashRegisterNumber,
        cutX: JSON.parse(localStorage.getItem('idcashdesk')),
      };
      const dataPayment = await getSalesfordatePayment(paymentsBody);
      const dataPa = dataPayment.data.filter((data)=>{
        return data?.status == 0
      });
      if (dataPa.length !== 0) {
        
        let total = 0;
        for (let i = 0; i < dataPa.length; i += 1) {
          total += dataPa[i].totalWithTax;
        }
        if (total - methods[index].value != 0) {
          const stepName2 = JSON.stringify(step[`${element.name}`]) != undefined ? parseFloat(step[`${element.name}`]) : 0
          const totalSetItem = parseFloat(stepName2) - parseFloat(total)
          localStorage.setItem(
            `${element.name}`,
            totalSetItem
          );
          coincidir = false;
          await toggle();
          return
        }
      }else {
        if (methods[index].value != 0) {
          if(methods[index].value[0]==='.'){
            localStorage.setItem(
              `${element.name}`,
              JSON.parse('0'+methods[index].value)
            );
          }else{
            localStorage.setItem(
              `${element.name}`,
              methods[index].value
            );
          }
          coincidir = false;
          await toggle();
          return
        }
      }
    });

    filterSubchannel.forEach(async (element, index) => {
      const channelsBody = {
        channel: element.name,
        date:  localStorage.getItem('dateSales')?
        `${localStorage.getItem('dateSales')} 00:00:00.0000000 +00:00`:`${fmtValue} 00:00:00.0000000 +00:00`,
        cashRegisterNumber: (tiketConfigurations.allItems)[0].cashRegisterNumber,
        cutX: JSON.parse(localStorage.getItem('idcashdesk')),
      };
      const dataChannels = await getSalesfordateChannel(channelsBody);
      const dataChan = dataChannels.data.filter((data)=>{
        return data?.status == 0
      });
      if (dataChan.length != 0) {
        let totalchannels = 0;
        let countdataSaleChannels = 0;
        for (let i = 0; i < dataChan.length; i += 1) {
          totalchannels += dataChan[i].totalWithTax;
          countdataSaleChannels++;
        }
        if(element.name == 'Cortesias'){
          totalchannels = countdataSaleChannels;
        }
        if (totalchannels - channels[index].value != 0) {
          var stepName2 = JSON.stringify(step[`${element.name}`]) != undefined ? parseFloat(step[`${element.name}`]): 0;
          var totalStep = stepName2 - totalchannels
          localStorage.setItem(
            `${element.name}`,
            totalStep
          );
          coincidir = false;
          await toggle();
          return
        }
      } else {
        if (channels[index].value != 0) {
            if(channels[index].value[0]==='.'){
              localStorage.setItem(`${element.name}`,JSON.parse(0+channels[index].value));
            }else{
            localStorage.setItem(`${element.name}`, channels[index].value);
          }
          coincidir = false;
          await toggle();
          return
        }
      }
    })

    filterPaymentMethodDetails.map(async (element, index) => {
      const detailpaymentadded = {
        total: methods[index].value,
        status: 1,
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        paymentMethodDetailID: element.id,
        userCreate: userID,
      };
      const paymentadded = await addDetailPaymentMethodCashClosing(
        detailpaymentadded
      );
    });

    filterSubchannel.map(async (element, index) => {
      const subchannelsdetails = {
        total: channels[index].value,
        status: 1,
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        subchannelID: element.id,
        userCreate: userID,
      };
      const subchannelsadded = await addDetailSubchannelCashClosing(
        subchannelsdetails
      );
    });
    
    // esto funcionara siempre que USD sea el primer registro.
    const cashData = {
      id: JSON.parse(localStorage.getItem('idcashdesk')),
      cash: methods[0].value,
    };
    const now = new Date();
    const hoursAndMinutes = `${now.getHours()}:${now.getMinutes()}`;
    const cashDataStatus = {
      id: JSON.parse(localStorage.getItem('idcashdesk')),
      cash: methods[0].value,
      status: 1,
      hour: hoursAndMinutes,
      userID,
      userUpdate: userID,
    };
    // update cashDeskClosingt : update money
    await updateCashCashDeskClosing(cashData);
    // update cashDeskClosing: update state
    await updateCashDeskClosing(cashDataStatus);
    
    if(coincidir){
      let detailPaymentCut = filterPaymentMethodDetails.map((paymentMethod)=>{
        return {
          name:paymentMethod.name,
          money:step[`${paymentMethod.name}`] ? step[`${paymentMethod.name}`]: 0
        };
      })
      let detailSubchannelCut = filterSubchannel.map((subchannel)=>{
        return {
          name:subchannel.name,
          money:step[`${subchannel.name}`] ? step[`${subchannel.name}`]: 0
        };
      })
      // get saleArray
      const saleArray = await getSalesForCut(localStorage.getItem('idcashdesk'));
      // PRINT CUT X
      dispatch({
        type:PRINT_CUT_X, 
        detailPaymentCut:detailPaymentCut,
        detailSubchannelCut:detailSubchannelCut,
        tiketConfigurations: tiketConfigurations.allItems,
        employeeName,
        sales:saleArray,
        datePrint: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): '',
        cashDeskClosingID:JSON.parse(localStorage.getItem('idcashdesk'))
      })
    }
    successMessage('Corte x finalizado con éxito','Exito')
    localStorage.removeItem('idcashdesk');
    localStorage.removeItem('prettycash');
    localStorage.removeItem('errorPretty');
    Swal.fire({
        title: '¿Quieres realizar el corte Z en este momento?',
        text: "En caso de no realizarlo se debera aperturar nuevamente la caja para vender",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Realizar corte Z',
        cancelButtonText: 'Realizarlo despues'
    }).then((result) => {
        if (result.isConfirmed) {
          history.push('/app/cut-z');
          window.location.reload();
        }else{
          history.push('/app/subway/welcome');
          window.location.reload();
        }
    })
  };



  const toggle = async() => {
    if(localStorage.getItem('errorPretty')){
      let missing = null;
      let ofMore = null;
      if(JSON.parse(localStorage.getItem('errorPretty'))>0){
        ofMore=JSON.parse(localStorage.getItem('errorPretty'));
      }
      if(JSON.parse(localStorage.getItem('errorPretty'))<0){
        missing=Math.abs(JSON.parse(localStorage.getItem('errorPretty')));
      }
      const dataReport = {
        description: 'No coincide',
        missing,
        ofMore,
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        status: 1,
        detail: 'Fondo de caja',
        userCreate: userID,
      };
      await addReport(dataReport);
    }

    // filter PaymentMethod details with status:0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })

    // Filter Subchannel with status:0
    const filterSubchannel = (subchannels.allItems).filter((subchannel)=>{
      return subchannel.status == 0;
    })

    filterPaymentMethodDetails.forEach(async(pay) => {
      if(localStorage.getItem(pay.name) !== null){
      let missing = null;
      let ofMore = null;
      if (
        localStorage.getItem(pay.name) !== undefined ||
        localStorage.getItem(pay.name) !== null
      ) {
        if (JSON.parse(localStorage.getItem(pay.name)) < 0) {
          missing = Math.abs(JSON.parse(localStorage.getItem(pay.name)));
        } else if (JSON.parse(localStorage.getItem(pay.name)) > 0) {
          ofMore = JSON.parse(localStorage.getItem(pay.name));
        }
        if (JSON.parse(localStorage.getItem(pay.name)) != 0) {
          const dataReport = {
            description: 'No coincide',
            missing,
            ofMore,
            cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
            status: 1,
            detail: pay.name,
            userCreate: userID,
          };
          await addReport(dataReport);
        }
      }    
    }
    });

    filterSubchannel.forEach(async(sub) => {
      if(localStorage.getItem(sub.name) !== null){
      let missing = null;
      let ofMore = null;
      if (
        localStorage.getItem(sub.name) !== undefined ||
        localStorage.getItem(sub.name) !== null
      ) {
        if (JSON.parse(localStorage.getItem(sub.name)) < 0) {
          missing = Math.abs(JSON.parse(localStorage.getItem(sub.name)));
        } else if (JSON.parse(localStorage.getItem(sub.name)) > 0) {
          ofMore = JSON.parse(localStorage.getItem(sub.name));
        }
        if (JSON.parse(localStorage.getItem(sub.name))!= 0) {
          const dataReport = {
            description: 'No coincide',
            missing,
            ofMore,
            cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
            status: 1,
            detail: sub.name,
            userCreate: userID,
          };
          await addReport(dataReport);
        }
      }
      }
    });

    let detailPaymentCut = filterPaymentMethodDetails.map((paymentMethod)=>{
      return {
        name:paymentMethod.name,
        money:step[`${paymentMethod.name}`] ? step[`${paymentMethod.name}`]: 0
      };
    })
    let detailSubchannelCut = filterSubchannel.map((subchannel)=>{
      return {
        name:subchannel.name,
        money:step[`${subchannel.name}`] ? step[`${subchannel.name}`]: 0
      };
    })
    // validaciones del reporte
    {
      filterPaymentMethodDetails.map((element) =>
        localStorage.getItem(element.name)
          ? localStorage.removeItem(element.name)
          : ''
      );
    }

    {
      filterSubchannel.map((element) =>
        localStorage.getItem(element.name)
          ? localStorage.removeItem(element.name)
          : ''
      );
    }
    // setCoincide(true);
    
    // PRINT CUT X
    if(localStorage.getItem('print')){
      const idCash = localStorage.getItem('idcashdesk')
      localStorage.removeItem('print');
      localStorage.removeItem('prettycash');
      localStorage.removeItem('errorPretty');
      successMessage('Corte x finalizado', 'Exito');
      // print report CUT
      const saleArray = await getSalesForCut(idCash);
      dispatch({
        type:PRINT_CUT_X, 
        detailPaymentCut:detailPaymentCut,
        detailSubchannelCut:detailSubchannelCut,
        tiketConfigurations: tiketConfigurations.allItems,
        employeeName,
        sales:saleArray,
        datePrint: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): '',
        cashDeskClosingID:JSON.parse(idCash)
      })
  
      // PRINT REPORT CUT
      // dispatch({
      //   type: PRINT_REPORT_CUT, 
      //   cashDeskClosingID:JSON.parse(idCash),
      //   employeeName,
      //   datePrint: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): '',
      //   tiketConfigurations: tiketConfigurations.allItems,
      // })
      Swal.fire({
          title: '¿Quieres realizar el corte Z en este momento?',
          text: "En caso de no realizarlo se debera aperturar nuevamente la caja para vender",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Realizar corte Z',
          cancelButtonText: 'Realizarlo despues'
      }).then((result) => {
          if (result.isConfirmed) {
            history.push('/app/cut-z');
            window.location.reload();
          }else{
            history.push('/app/subway/welcome');
            window.location.reload();
          }
      })
    }
  };

  const cashDeskClosingID = {
    cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
    status: 0,
  };

  useEffect(() => {
    if (!localStorage.getItem('idcashdesk')) {
      errorMessage('No has aperturado un corte de caja', 'Error');
      history.push('/app/customer-sales');
    }
    dispatch({ type: GET_SUBCHANNEL });
    dispatch({ type: GET_PAYMENT_METHOD_DETAIL });
    dispatch({ type: GET_TIKET_CONFIGURATION });
    dispatch({
      type: GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
      outputscashdesk: cashDeskClosingID,
    });
  }, [dispatch]);

  const PaymentMethodInputs2 = useMemo(()=>{
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0
    })

    const PaymentMethodList = filterPaymentMethodDetails.map((paymentMethod)=>{
      return(
        <Colxx xxs={12} xs={12} md={3} lg={3} key={paymentMethod.id}>
          <div className="mt-2 mb-2">
            <Label>{paymentMethod.name}</Label>
            <Input
              type="number"
              className="rounded"
              min={0}
              onKeyPress={(event) => {
                if (!/^[0-9\.]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e)=>{
                setStep({
                  ...step,
                  [paymentMethod.name]:e.target.value
                })
              }}
              step={0.01}
              value={step[`${paymentMethod.name}`]}
              defaultValue={0}
              placeholder="Ingresa cantidad"
              name="methods"
            />
          </div>
        </Colxx>
      )
    })

    return PaymentMethodList
  },[step])

  const SubChannelsInputs2 = useMemo(()=>{
    const filterSubchannel = subchannels.allItems.filter((subchannel)=>{
      return subchannel.status == 0
    });

    
    const SubchannelList = filterSubchannel.map((subchannel)=>{
      return (
        <Colxx xxs={12} xs={12} md={3} lg={3} key={subchannel.id}>
          <div className="mt-2 mb-2">
            <Label>{subchannel.name}</Label>
            <Input
              type="number"
              className="rounded"
              min={0}
              step={0.01}
              onKeyPress={(event) => {
                if (!/^[0-9\.]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e)=>{
                setStep({
                  ...step,
                  [subchannel.name]:e.target.value
                })
              }}
              value={step[`${subchannel.name}`]}
              defaultValue={0}
              placeholder="Ingresa cantidad"
              name="channels"
            />
          </div>
        </Colxx>
      )
    });
    

    return SubchannelList
  },[step])

  

  return (
    <>
      <Card className="question d-flex mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1">
              <span className="heading-number d-inline-block mt-2 mb-2" />
              <h3>Detalles de corte de caja x en efectivo </h3>
            </div>
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="edit-mode">
            <Form
              onSubmit={(e) => {
                submit(e);
              }}
            >
              <FormGroup>
                <Row>
                  <Colxx xss={12} xs={12} md={12} lg={12}>
                    <Row>
                      <Colxx xxs={12} xs={12} md={4} lg={4}
                        hidden={localStorage.getItem('dateSales')}
                      >
                        <div className="mt-2 mb-2">
                          <Label>Fecha</Label>
                          <DatePicker
                            id="example-datepicker"
                            autoComplete="off"
                            value={datevalue}
                            minDate={new Date(Date.now() - 86400000)}
                            maxDate={new Date()}
                            dateFormat="YYYY-MM-DD"
                            placeholder="Ingresa la fecha"
                          />
                        </div>
                      </Colxx>
                      <Colxx xxs={12} xs={12} md={4} lg={4}>
                        <div className="mt-2 mb-2">
                          <Label>Fondo de caja</Label>
                          <Input
                            type="number" 
                            onKeyPress={(event) => {
                              if (!/^[0-9\.]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            className="rounded"
                            placeholder="Cantidad"
                            min={0}
                            step={0.01}
                            value={cashRegister}
                            onChange={(e) => {
                              setCashRegister(e.target.value);
                            }}
                          />
                        </div>
                      </Colxx>
                      <h3 className="container mt-4">
                        Domicilio y administrativos
                      </h3>
                      {/* INPUT SUBCHANNELS */}
                      {SubChannelsInputs2}
                      <h3 className="container mt-4">Métodos de pago</h3>
                      {/* INPUT PAYMENT METHOD */}
                      {PaymentMethodInputs2}
                    </Row>
                  </Colxx>
                </Row>
                <div className="text-right">
                  <Button
                    outline
                    color="primary"
                    className="m-1"
                    onClick={
                      () => cancelCut()
                    }
                  >
                    <i className="simple-icon-close btn-group-icon" /> Cancelar
                  </Button>
                  <Button
                    // outline
                    type="submit"
                    color="primary"
                    className="m-1"
                  >
                    <i className="simple-icon-plus btn-group-icon" /> Guardar
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </div>
        </div>
      </Card>
    </>
  );
};
export default FrmCutX;
