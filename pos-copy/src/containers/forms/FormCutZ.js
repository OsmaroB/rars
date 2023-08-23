/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useMemo, useState } from 'react';
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
import {
  GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
  GET_TIKET_CONFIGURATION,
  GET_PAYMENT_METHOD_DETAIL,
  GET_SUBCHANNEL,
  PRINT_CUT_Z,
} from 'redux/contants';
import {
  getSalesfordateChannel,
  getSalesfordatePayment,
  getSalesForDate
} from 'apis/sales-for-date';
import {
  addDetailSubchannelCashClosing,
  readDetailChannelCashClosingForCashRegister,
} from 'apis/detail-subchannel-method-cash-closing';
import {
  addDetailPaymentMethodCashClosing,
  readDetailPaymentMethodCashClosingForCashRegister,
  readtDetailPaymentMethodCashClosingForCashRegister,
} from 'apis/detail-payment-method-cash-closing';
import Cookies from 'universal-cookie';
import { addReport, readReport } from 'apis/report-cash-desk-closing';
import {
  addCashDeskClosing,
  checkCutzPending,
  readCashClosing,
  readCashDeskPending,
  startCashDeskClosing,
  updateCashCashDeskClosing,
} from 'apis/cash-desk-closing';
import successMessage, { errorMessage } from 'helpers/messages';
import { useHistory } from 'react-router-dom';
import { checkCode } from 'apis/user';
import validation from '../validations/ValidationCutZ';
import globalFunctions from 'helpers/globalFunctions';

const FrmCutZ = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cashRegister, setCashRegister] = useState(0);
  const [cashRegister1, setCashRegister1] = useState(0);
  const [modalToggle, setModalToggle] = useState(false);
  const [cutPending, setCutPending] = useState('');
  const [coincide, setCoincide] = useState(true);
  const subchannels = useSelector((state) => state.subchannels);
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);
  const cookies = new Cookies();
  const [employeeName] = useState(cookies.get('employeeName'));
  const [userID] = useState(cookies.get('userID'));
  const paymentMethodDetails = useSelector(
    (state) => state.paymentMethodDetails
  );
  const [datevalue, setDateValue] = useState(null);
  const [code, setCode] = useState('');
  const [fmtValue, setFmtValue] = useState(undefined);
  const [description, setDescription] = useState('');
  const outputcash = useSelector((state) => state.outputcash);
  const [datos, setDatos] = useState(false);
  // const paymentlist = useSelector((state) => state.salesfordate.payments);
  // Toggle for Modal

  useEffect(async () => {
    const yesterday = new Date(Date.now() - 86400000);
    const datefmt = localStorage.getItem('dateSales')
      ? localStorage.getItem('dateSales')
      : `${yesterday.getFullYear()}-${parseInt(
          yesterday.getMonth() + 1
        )}-${yesterday.getDate()}`;
    setFmtValue(datefmt);
    if (tiketConfigurations?.allItems != '') {
      const check = {
        type: 1,
        date: datefmt,
        cashRegister: tiketConfigurations.allItems[0].cashRegisterNumber,
      };
      const getCutPending = await checkCutzPending(check);
      setCutPending(getCutPending.data);
    }
  }, []);

  const search = async (e) => {

    const yesterday = new Date(Date.now() - 86400000);
    let datefmt 
    // If dateSale exist use in search CutX
    if(localStorage.getItem('dateSales')){
      datefmt = localStorage.getItem('dateSales');
    }else{
      datefmt = `${yesterday.getFullYear()}-${parseInt(yesterday.getMonth() + 1 )}-${yesterday.getDate()}`
    }
    const check = {
      type: 1,
      date: datefmt,
      cashRegister: tiketConfigurations.allItems[0].cashRegisterNumber,
    };
    const getCutPending = await checkCutzPending(check);
    const getCode = await checkCode({ code });
    if (getCutPending.data.length !== 0) {
      if (getCode.data === null) {
        errorMessage(
          'Debes ingresar un código válido para autorizar la operación',
          'Error'
        );
        return;
      }
    }
    // if roleDetail have roleDetail "/app/cut/z"
    if (localStorage.getItem('roleDetail')) {
      // specific role in actual user
      const filter = '/app/cut-z';
      // filter roleDetail in actual user for detailRole
      const permissionList = JSON.parse(localStorage.getItem('roleDetail')).filter(
        function (element) {
          return (
            element.url.toLowerCase().indexOf(filter) !== -1 &&
            element.status == 0
          );
        }
      );
      // If permissionList > 0 then user hace permission "/app/cut/z"
      if (permissionList.length > 0) {
        if (getCutPending.data.length == 0) {
          errorMessage(
            `Debes finalizar el corte z del día anterior, cargando datos del ${datefmt}`,
            'Error'
          );
        } else {
          const today = new Date(Date.now());
          datefmt = `${yesterday.getFullYear()}-${parseInt(
            yesterday.getMonth() + 1
          )}-${today.getDate()}`;
          setFmtValue(datefmt);
        }
      }
    }


    // filter PaymentMethod for Status: 0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })
    // setItem  paymentMethodDetails in localStorage
    filterPaymentMethodDetails.forEach((el) => {
      localStorage.setItem(`cash${el.name}`, 0);
      localStorage.setItem(`missing${el.name}`, 0);
      localStorage.setItem(`ofmore${el.name}`, 0);
    });
    // filter Subchannel for Status:0
    const filterSubchannel = (subchannels.allItems).filter((subchannel)=>{      
      return subchannel.status == 0;
    })
    // setItem subchannel in localStorage
    filterSubchannel.forEach((el) => {
      localStorage.setItem(`chan${el.name}`, 0);
      localStorage.setItem(`missing${el.name}`, 0);
      localStorage.setItem(`ofmore${el.name}`, 0);
    });

    const data = {
      date: datefmt,
      cashRegister: tiketConfigurations.allItems[0].cashRegisterNumber,
      status: 0,
    };

    e.preventDefault();
    if (!validation.search(data)) {
      return;
    }
    // valid exist localStorage 'idcashdesk'
    if (localStorage.getItem('idcashdesk')) {
      const data1 = {
        id: localStorage.getItem('idcashdesk'),
      };
      const cortexPendiente = await readCashDeskPending(data1);
      if (cortexPendiente.data.length !== 0) {
        errorMessage(`Posees un corte x sin finalizar`, 'Error');
        history.push('/app/cut-x');
      }
    }
    const dataCortex = {
      date: datefmt,
      cashRegister: tiketConfigurations.allItems[0].cashRegisterNumber,
      status: 1,
    };
    const corteX = await readCashClosing(dataCortex);
    let dataChan = null;
    corteX.data.forEach(async (cor) => {
      dataChan = {
        cashDeskClosingID: cor.id,
      };
      const objchannel = await readDetailChannelCashClosingForCashRegister(
        dataChan
      );
      objchannel.data.forEach(async (chan) => {
        let total = 0;
        if (localStorage.getItem(`chan${chan.subchannel.name}`) !== null) {
          total =
            JSON.parse(localStorage.getItem(`chan${chan.subchannel.name}`)) +
            chan.total;
        } else {
          total = chan.total;
        }
        localStorage.setItem(
          `chan${chan.subchannel.name}`,
          JSON.stringify(total)
        );
      });
    });
    let dataPay = null;
    corteX.data.forEach(async (cor) => {
      dataPay = {
        cashDeskClosingID: cor.id,
      };
      const obj = await readDetailPaymentMethodCashClosingForCashRegister(
        dataPay
      );
      obj.data.forEach(async (paym) => {
        let total = 0;
        if (
          localStorage.getItem(`cash${paym.paymentMethodDetail.name}`) !== null
        ) {
          total =
            JSON.parse(
              localStorage.getItem(`cash${paym.paymentMethodDetail.name}`)
            ) + paym.total;
        } else {
          total = paym.total;
        }
        localStorage.setItem(
          `cash${paym.paymentMethodDetail.name}`,
          JSON.stringify(total)
        );
      });
    });
    let dataMissMore = null;
    corteX.data.forEach(async (cor) => {
      dataMissMore = {
        cashDeskClosingID: cor.id,
      };
      const reportes = await readReport(dataMissMore);
      reportes.data.forEach(async (rep) => {
        let total = 0;
        if (localStorage.getItem(`missing${rep.detail}`) !== null) {
          if (rep.missing !== null) {
            total =
              JSON.parse(localStorage.getItem(`missing${rep.detail}`)) +
              rep.missing;
          } else {
            total = JSON.parse(localStorage.getItem(`missing${rep.detail}`));
          }
        } else {
          total = rep.missing;
        }
        localStorage.setItem(`missing${rep.detail}`, JSON.stringify(total));
        let totalofmore = 0;
        if (localStorage.getItem(`ofmore${rep.detail}`) !== null) {
          if (rep.ofMore !== null) {
            totalofmore =
              JSON.parse(localStorage.getItem(`ofmore${rep.detail}`)) +
              rep.ofMore;
          } else {
            totalofmore = JSON.parse(
              localStorage.getItem(`ofmore${rep.detail}`)
            );
          }
        } else {
          totalofmore = rep.ofMore;
        }
        localStorage.setItem(
          `ofmore${rep.detail}`,
          JSON.stringify(totalofmore)
        );
      });
    });
    setDatos(true);
  };




  const submit = async () => {
    const yesterday = new Date(Date.now() - 86400000);

    const datefmt = localStorage.getItem('dateSales')
      ? localStorage.getItem('dateSales')
      : `${yesterday.getFullYear()}-${parseInt(yesterday.getMonth() + 1)}-${yesterday.getDate()}`;
    setFmtValue(datefmt);
    ///
    const now = new Date();
    const getCode = await checkCode({ code });
    const hoursAndMinutes = `${now.getHours()}:${now.getMinutes()}`;

    const cashdeskz = {
      date: datefmt,
      cash: JSON.parse(localStorage.getItem('cashDolar estadounidense')),
      hour: hoursAndMinutes,
      type: 1,
      status: 1,
      prettycash: JSON.parse(localStorage.getItem('prettycash')),
      cashRegister: tiketConfigurations.allItems[0].cashRegisterNumber,
      userID,
      userCreate: userID,
      userAproved: getCode.data ? getCode.data.id : null,
    };

    const cashadded = await addCashDeskClosing(cashdeskz);

    localStorage.setItem('idcashdesk', cashadded.data.id);

    // filter PaymentMethod for Status: 0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })

    filterPaymentMethodDetails.forEach(async (pay) => {
      const dataReport = {
        description: 'Reporte de corte z',
        missing: localStorage.getItem(`missing${pay.name}`),
        ofMore: JSON.parse(localStorage.getItem(`ofmore${pay.name}`)),
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        status: 1,
        detail: pay.name,
        userCreate: userID,
      };
      if (dataReport.missing !== null || dataReport.ofMore !== null) {
        addReport(dataReport);
      }
      const detailpaymentadded = {
        total:
          JSON.parse(localStorage.getItem(`cash${pay.name}`)) +
          JSON.parse(localStorage.getItem(`ofmore${pay.name}`)) -
          JSON.parse(localStorage.getItem(`missing${pay.name}`)),
        status: 1,
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        paymentMethodDetailID: pay.id,
        userCreate: userID,
      };
      const paymentadded = await addDetailPaymentMethodCashClosing(
        detailpaymentadded
      );
    });

    // filter Subchannel for Status:0
    const filterSubchannel = (subchannels.allItems).filter((subchannel)=>{      
      return subchannel.status == 0;
    })

    filterSubchannel.forEach(async (pay) => {
      const dataReport = {
        description: 'Reporte de corte z',
        missing: JSON.parse(localStorage.getItem(`missing${pay.name}`)),
        ofMore: JSON.parse(localStorage.getItem(`ofmore${pay.name}`)),
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        status: 1,
        detail: pay.name,
        userCreate: userID,
      };
      const subchannelsdetails = {
        total:
          JSON.parse(localStorage.getItem(`chan${pay.name}`)) +
          JSON.parse(localStorage.getItem(`ofmore${pay.name}`)) -
          JSON.parse(localStorage.getItem(`missing${pay.name}`)),
        status: 1,
        cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
        subchannelID: pay.id,
        userCreate: userID,
      };
      const subchannelsadded = await addDetailSubchannelCashClosing(
        subchannelsdetails
      );
      if (dataReport.missing !== null || dataReport.ofMore !== null) {
        addReport(dataReport);
      }
    });

    // print CUT Z
    dispatch({
      type: PRINT_CUT_Z,
      tiketConfigurations: tiketConfigurations.allItems,
      employeeName,
      datePrint: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): '',
      cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
    });

    // dispatch({
    //   type: PRINT_REPORT_CUT,
    //   cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
    //   employeeName,
    //   datePrint: localStorage.getItem('dateSales') ? localStorage.getItem('dateSales'): '',
    //   tiketConfigurations: tiketConfigurations.allItems,
    // });
    // remove in globalFunction localStorage
    globalFunctions.removeFinishCutZ(
      filterPaymentMethodDetails,
      filterSubchannel,
    )
    localStorage.removeItem('dateSales');
    successMessage('Corte z finalizado', 'Exito');
    setDatos(false);
    history.push('/app/subway/welcome');
  };


  useEffect(() => {
    if (coincide === false) {
      setModalToggle(true);
    }
    setDescription('');
  }, [coincide]);


  const cashDeskClosingID = {
    cashDeskClosingID: JSON.parse(localStorage.getItem('idcashdesk')),
    status: 0,
  };

  useEffect(() => {
    dispatch({ type: GET_SUBCHANNEL });
    dispatch({ type: GET_PAYMENT_METHOD_DETAIL });
    dispatch({ type: GET_TIKET_CONFIGURATION });
    dispatch({
      type: GET_OUTPUT_CASH_FOR_CUT_AND_STATUS,
      outputscashdesk: cashDeskClosingID,
    });
  }, []);

  const handleChange = (datevalueSelected, formattedValue) => {
    setDateValue(datevalueSelected);
    setFmtValue(formattedValue);
  };

  useEffect(() => {
    if (datos === true) {
      const timer = setInterval(() => {
        setCashRegister1(200);
        setCashRegister1(0);
        submit();
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [datos]);

  useEffect(() => {
    console.log(`Formatted value is ${fmtValue} `);
  }, [fmtValue]);


  const PaymentMethodReportDetail = ()=>{
    // filter PaymentMethod for Status: 0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })
    const PaymentMethodList = filterPaymentMethodDetails.map((paymentMethod)=>{
      return (
        <Colxx xxs={12} xs={12} md={6} lg={6} key={paymentMethod.id}>
          <h6>{paymentMethod.name}</h6>
          <ul>
            <li>
              Faltante ${' '}
              {JSON.parse(
                localStorage.getItem(`missing${paymentMethod.name}`)
              )}
            </li>
            <li>
              Sobrante ${' '}
              {JSON.parse(
                localStorage.getItem(`ofmore${paymentMethod.name}`)
              )}
            </li>
          </ul>
        </Colxx>
      );
    })
    return PaymentMethodList;
  }

  const SubchannelsReport = () =>{
    // filter Subchannel for Status:0
    const filterSubchannel = (subchannels.allItems).filter((subchannel)=>{      
      return subchannel.status == 0;
    })

    const subchannelList = filterSubchannel.map((subchannel)=>{
      return (
        <Colxx xxs={12} xs={12} md={6} lg={6} key={subchannel.id}>
          <h6>{subchannel.name}</h6>
          <ul>
            <li>
              Faltante ${' '}
              {JSON.parse(
                localStorage.getItem(`missing${subchannel.name}`)
              )}
            </li>
            <li>
              Sobrante ${' '}
              {JSON.parse(
                localStorage.getItem(`ofmore${subchannel.name}`)
              )}
            </li>
          </ul>
        </Colxx>
      );
    })

    return subchannelList;
  };

  const readCutZ = useMemo(() => {
    if (datos === true) {
      return (
        <Form>
          <FormGroup>
            <Row>
              <Colxx>
                <Row>
                  <Colxx xxs={12} xs={12} md={6} lg={6}>
                    <div className="mt-2 mb-2">
                      <Label>Remesa bancaria</Label>
                      <Input
                        type="number"
                        className="rounded"
                        placeholder="Cantidad"
                        readOnly
                        value={localStorage.getItem(`cashDolar estadounidense`)}
                        min={0}
                        onChange={(e) => {
                          setCashRegister1(e.target.value);
                        }}
                      />
                    </div>
                  </Colxx>
                  <h3 className="container mt-4">
                    Domicilio y administrativos
                  </h3>
                  {/* Subchannel Report */}
                  <SubchannelsReport />
                  <h3 className="container mt-4">Métodos de pago</h3>
                  {/* PaymentMethod Detail Report */}
                  <PaymentMethodReportDetail />
                </Row>
              </Colxx>
            </Row>
            <div className="text-right">
              <Button
                color="primary"
                className="m-1"
              >
                <i className="simple-icon-plus btn-group-icon" /> Finalizar
                corte
              </Button>
            </div>
          </FormGroup>
        </Form>
      );
    }
    return <></>;
  }, [datos, cashRegister1]);

  const PaymentMethodDetailsShow = () => {
    // filter PaymentMethod for Status: 0
    const filterPaymentMethodDetails = (paymentMethodDetails.allItems).filter((paymentMethod)=>{
      return paymentMethod.status == 0;
    })

    const paymentMethodList = filterPaymentMethodDetails.map((paymentMethod)=>{
      return (
        <li key={paymentMethod.id}>
        <h6>
          {paymentMethod.name},{' '}
          {JSON.parse(
            localStorage.getItem(`cash${paymentMethod.name}`)
          ) +
            JSON.parse(
              localStorage.getItem(`ofmore${paymentMethod.name}`)
            ) +
            JSON.parse(
              localStorage.getItem(`missing${paymentMethod.name}`)
            )}
        </h6>
      </li>
      )
    })

    return paymentMethodList;

  };

  return (
    <>
      <Colxx xxs={7}>
        <Card className="question d-flex mb-4">
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
              <div className="list-item-heading mb-0 truncate w-80 mb-1">
                <h3>Detalles de corte de caja z </h3>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="edit-mode">
              <Form
                onSubmit={(e) => {
                  search(e);
                  e.preventDefault();
                }}
              >
                <FormGroup>
                  <Row>
                    <Colxx xss={12} xs={12} md={12} lg={12}>
                      <Row>
                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                          <div className="mt-4 mb-4">
                            <Button
                              // outline
                              type="submit"
                              color="primary"
                              className="m-1"
                            >
                              <i className="simple-icon-magnifier btn-group-icon" />{' '}
                              Generar corte
                            </Button>
                          </div>
                        </Colxx>
                        <Colxx
                          xxs={12}
                          xs={12}
                          md={6}
                          lg={6}
                          hidden={cutPending.length > 0}
                        >
                          <div className="mt-2 mb-2">
                            <Label>Código de autorización</Label>
                            <Input
                              type="password"
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
                </FormGroup>
              </Form>
              {readCutZ}
            </div>
          </div>
        </Card>
      </Colxx>
      <Colxx xxs={5}>
        <Card className="question d-flex mb-4">
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
              <div className="list-item-heading mb-0 truncate w-100 mb-1 mt-1">
                <h3>Lista de depositos de efectivo </h3>
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
                        {/* PAYMENTMETHOD DETAILS */}
                        <PaymentMethodDetailsShow />
                      </ul>
                    </Colxx>
                  </Row>
                </Colxx>
              </Row>
            </div>
          </div>
        </Card>
      </Colxx>
    </>
  );

};

export default FrmCutZ;
