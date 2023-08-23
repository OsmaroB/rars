import { put, takeEvery } from 'redux-saga/effects';
import {
    getSaleDetailForSaleID as getSaleDetailForSaleIDAPI,
} from '../../apis/sale-detail';
import {
    printCanceledSale as printCanceledSaleAPI,
    printCutX as printCutXAPI,
    printCutZ as printCutZAPI,
    printReportCut as printReportCutAPI,
    printOutputCash as printOutputCashAPI
} from '../../apis/print'
import {
    getSaleDetailForSalesID as getSaleDetailForSalesIDAPI 
} from '../../apis/sale-detail';
import {
    readDetailPaymentMethodCashClosingForCashRegister as readDetailPaymentMethodCashClosingForCashRegisterAPI 
} from '../../apis/detail-payment-method-cash-closing';
import {
    readDetailChannelCashClosingForCashRegister as readDetailChannelCashClosingForCashRegisterAPI
} from '../../apis/detail-subchannel-method-cash-closing';
import {
    readReport as readReporForCashDeskClosingAPI,
} from '../../apis/report-cash-desk-closing';
import {
    getAllPrintsSlice,
    printCanceledSaleSlice,
} from './slice';
import {
    GET_ALL_PRINT,
    PRINT_CUT_X,
    PRINT_CUT_Z,
    PRINT_OUTPUT_CASH,
    PRINT_REPORT_CUT,
    PRINT_TIKET,
} from '../contants';
import { getSalesForDate } from 'apis/sales-for-date';
import moment from 'moment';



export function* getAllPrintsSaga(action){
    yield put(getAllPrintsSlice(action));
}

export function* printCanceledSaleSaga(action){
    try {
        const saleDetails = yield getSaleDetailForSaleIDAPI({saleID:action.tiketData.saleID});
        yield printCanceledSaleAPI(
            {
                ...action.tiketData,
                detailSale:saleDetails,
                typeTiket:action.typeTiket,
            }
        )
        yield put(printCanceledSaleSlice(action));
    } catch (error) {
        console.log(error);
    }
}

export function* printReportCutSaga(action){
    try {
        try {
            const cashDeskClosingID = action.cashDeskClosingID;
            const tiketConfigurations = action.tiketConfigurations;
            const employeeName = action.employeeName;
            const datePrint = action.datePrint;
            const reportsForCashDeskClosing = yield readReporForCashDeskClosingAPI({cashDeskClosingID})
            const printData ={
                tiketConfiguration: tiketConfigurations,
                employeeName,
                reportsForCashDeskClosing,
                datePrint
            }
            yield printReportCutAPI(printData);
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
};

export function* printCutXSaga(action){
    try {
        const cashDeskClosingID = action.cashDeskClosingID;
        const detailPaymentCut = action.detailPaymentCut;
        const detailSubchannelCut = action.detailSubchannelCut;
        const tiketConfigurations = action.tiketConfigurations;
        const employeeName = action.employeeName;
        const datePrint = action.datePrint;
        const sales = action.sales;
        const saleDetailForSalesID = yield getSaleDetailForSalesIDAPI(sales);
        const detailPaymentMethodCashClosing = yield readDetailPaymentMethodCashClosingForCashRegisterAPI({cashDeskClosingID});
        const detailChannelCashClosing = yield readDetailChannelCashClosingForCashRegisterAPI({cashDeskClosingID});
        const reportsForCashDeskClosing = yield readReporForCashDeskClosingAPI({cashDeskClosingID})

        const printData ={
            tiketConfiguration: tiketConfigurations,
            employeeName,
            detailPaymentCut,
            detailSubchannelCut,
            datePrint,
            detailPaymentMethodCashClosing,
            detailChannelCashClosing,
            sales,
            reportsForCashDeskClosing,
            saleDetailForSalesID,
            transactions:sales.length
        }
        yield printCutXAPI(printData);
    } catch (error) {
        console.log(error);
    }
    
};

export function* printCutCashSaga(action){
    try {
        const tiketConfigurations = action.tiketConfigurations;
        const employeeName = action.employeeName;
        const description = action.description;
        const outputCash = action.outputCash;
        const totalOutputCashDesk = action.totalOutputCashDesk;
        const datePrint = action.datePrint;
        const printData = {
            tiketConfiguration:tiketConfigurations,
            employeeName,
            outputCash,
            datePrint,
            totalOutputCashDesk,
            description,
        }
        yield printOutputCashAPI(printData);
    } catch (error) {
        console.log(error);
    }
}

export function* printZSaga(action){
    try {
        
        const cashDeskClosingID = action.cashDeskClosingID;
        const tiketConfigurations = action.tiketConfigurations;
        const employeeName = action.employeeName;
        const datePrint = action.datePrint;
        const sales = yield getSalesForDate({date:`${datePrint} 00:00:00.0000000 +00:00`});
        const saleDetailForSalesID = yield getSaleDetailForSalesIDAPI({data:sales});
        const detailPaymentMethodCashClosing = yield readDetailPaymentMethodCashClosingForCashRegisterAPI({cashDeskClosingID});
        const detailChannelCashClosing = yield readDetailChannelCashClosingForCashRegisterAPI({cashDeskClosingID});
        console.log(sales);

        const printData ={
            tiketConfiguration: tiketConfigurations,
            employeeName,
            detailPaymentMethodCashClosing,
            detailChannelCashClosing,
            datePrint,
            sales:sales,
            saleDetailForSalesID:saleDetailForSalesID,
        }
        console.log(printData)
        yield printCutZAPI(printData);
    } catch (error) {
        console.log(error);
    }
}

export function* printSaga(){
    yield takeEvery(GET_ALL_PRINT, getAllPrintsSaga);
    yield takeEvery(PRINT_TIKET, printCanceledSaleSaga)
    yield takeEvery(PRINT_CUT_X, printCutXSaga);
    yield takeEvery(PRINT_CUT_Z, printZSaga);
    yield takeEvery(PRINT_REPORT_CUT, printReportCutSaga);
    yield takeEvery(PRINT_OUTPUT_CASH, printCutCashSaga)
}