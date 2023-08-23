import { put, takeEvery } from 'redux-saga/effects';
import {
    getSale as getSaleAPI,
    addSale as addSaleAPI,
    updateSale as updateSaleAPI,
    removeSale as removeSaleAPI,
    canceledSale as canceledSaleAPI,
}from '../../apis/sales';

import {
    printTiket as printTiketAPI,
} from '../../apis/print'

import {
    getTiketConfiguration as getTiketConfigurationAPI,
} from '../../apis/tiket-configuration';
import {
    addDocument as addDocumentAPI,
} from '../../apis/document';

import {
    addSaleDetail as addSaleDetailAPI
} from '../../apis/sale-detail';

import {
    getSaleSlice,
    openFormSaleSlice,
    closeFormSaleSlice,
    addSaleSlice,
    updateSaleSlice,
    removeSaleSlice,
    searchSaleSlice,
    addCanceledSaleSlice
} from './slice';
import {
    GET_SALE,
    OPEN_FORM_SALE,
    CLOSE_FORM_SALE,
    ADD_SALE,
    UPDATE_SALE,
    REMOVE_SALE,
    SEARCH_SALE,
    ADD_CANCELED_SALE
} from '../contants';

export function* getSaleSaga(){
    try {
        const sales = yield getSaleAPI();
        yield put(getSaleSlice(sales));
    } catch (error) {
        console.log(error);
    }
}
export function* updateSaleSaga(action){
    try {
        const sales = yield getSaleAPI();
        yield updateSaleAPI(action.sale);
        const newData = {...action, sales:sales.data};
        yield put(updateSaleSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* addSaleSaga(action){
    try {
        // create sale
        const newSale = yield addSaleAPI({...action.sale, channelID:action.channel});
        const discountSubchannel = action.discountSubchannel;
        const description = action.description;
        const customerName = action.customerName;
        const employeeName = action.employeeName;
        const channel = action.channel;
        const sale = action.sale;
        const order = action.order;
        const sales = yield getSaleAPI();
        // CREATE DOCUMENT
        const document = action.document;
        // function mask document
        function zfill(number, width) {
            var numberOutput = Math.abs(number); /* Valor absoluto del número */
            var length = number.toString().length; /* Largo del número */ 
            var zero = "0"; /* String de cero */  
            
            if (width <= length) {
                if (number < 0) {
                     return ("-" + numberOutput.toString()); 
                } else {
                     return numberOutput.toString(); 
                }
            } else {
                if (number < 0) {
                    return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
                } else {
                    return ((zero.repeat(width - length)) + numberOutput.toString()); 
                }
            }
        }

        const actualCorrelative = parseFloat(action.document.actualCorrelative);
        const newActualCorrelative = zfill((actualCorrelative+1), (action.document.actualCorrelative).length);
        const newDocument = {
            ...document,
            id:'',
            actualCorrelative: newActualCorrelative
        }
        
        yield addDocumentAPI(newDocument);
        // FINISH CREATE DOCUMENT

        // CREATE ALL SALES_DETAILS
        let indexForLine = 1;
        order.forEach((product,index)=>{
            const total = ((product.cost)*(product.cant));
            const discountLine = 0.00;
            const totalWithDiscount = (total - discountLine);
            const totalWithTax = totalWithDiscount;
            const tax = ((totalWithTax*0.13)/1.13);
            const totalWithOutTax = totalWithTax - tax;
            let modifier = '';
            const modifierFilter = (product.modifierProduct).filter((product)=>{
                return product != null;
            });
            if(modifierFilter.length != 0 ){
                modifierFilter.forEach((element) => {
                    if(element?.id != null){
                        modifier = modifier + `${element.modifier.name} - $${element.price} - cant:${element.cantModifier} - `
                    }
                });
            }
            const newDataProduct = {
                tiketNumber:sale.tiketNumber,
                line:indexForLine,
                product:product.name,
                cant:product.cant,
                cost:product.cost,
                description:'',
                modifier,
                cashRegisterNumber:sale.cashRegisterNumber,
                restaurant:sale.restaurant,
                channel:sale.channel,
                paymentMethod:sale.paymentMethod,
                date:sale.date,
                hour:sale.hour,
                totalWithoutTax:totalWithOutTax,
                totalWithDiscount,
                tax,
                totalWithTax,
                discountLine,
                tip:0.00,
                priceID:product.priceID,
                customerID:sale.customerID,
                saleID:newSale.id,
                userID:sale.userCreate,
                userCreate:sale.userCreate,
                maskDetail:product.mask,
                typeDetail:0
            }
            indexForLine++;
            addSaleDetailAPI(newDataProduct);
            if(modifierFilter.length != 0 ){
                modifierFilter.forEach((modifierP) => {
                    if(modifierP?.id != null){
                        console.log(indexForLine)
                        const totalWithTaxModifier = modifierP.cantModifier *  modifierP.price;
                        const discountLineModifier = 0;
                        const totalWithDiscountModifier = totalWithTaxModifier;
                        const taxModifier = ((totalWithTaxModifier*0.13)/1.13);
                        const totalWithOutTaxModifier = totalWithTaxModifier-taxModifier;

                        const newDataModifier = {
                            tiketNumber:sale.tiketNumber,
                            // no esto seguro como seria la linea
                            line:indexForLine,
                            product:modifierP.modifier.name,
                            cant:modifierP.cantModifier,
                            cost:modifierP.price,
                            description:'',
                            modifier:'',
                            cashRegisterNumber:sale.cashRegisterNumber,
                            restaurant:sale.restaurant,
                            channel:sale.channel,
                            paymentMethod:sale.paymentMethod,
                            date:sale.date,
                            hour:sale.hour,
                            totalWithoutTax: totalWithOutTaxModifier,
                            totalWithDiscount:totalWithDiscountModifier,
                            tax:taxModifier,
                            totalWithTax:totalWithTaxModifier,
                            discountLine:discountLineModifier,
                            tip:0.00,
                            priceID:modifierP.priceID,
                            customerID:sale.customerID,
                            saleID:newSale.id,
                            userID:sale.userCreate,
                            userCreate:sale.userCreate,
                            maskDetail:modifierP.modifier.mask,
                            typeDetail:1
                        }
                        indexForLine++
                        addSaleDetailAPI(newDataModifier);
                    }
                });
            }

        });


        const newData = {...action, sales:sales.data};
        yield put(addSaleSlice(newData));
        const tiketConfiguration = yield getTiketConfigurationAPI();
        const dataPrint = {
            tiketConfiguration,
            sale:'sale',
            description,
            detailSale:order,
            document:{...document, actualCorrelative:newActualCorrelative},
            channel,
            channelName:sale.channel,
            customerName,
            employeeName,
            datePrint:newSale.date,
            discountSubchannel,
        }
        // console.log(tiketConfiguration);
        const result = yield printTiketAPI(dataPrint);

    } catch (error) {
        console.log(error);
    }
}

export function* removeSaleSaga(action){
    try {
        yield removeSaleAPI(action.sale);
        const sales = yield getSaleAPI();
        yield put(removeSaleSlice({...action, sales}));
    } catch (error) {
        console.log(error);
    }
}

export function* addCanceledSaleSaga(action){
    try {
        const canceledSale = yield canceledSaleAPI(action.sale);
        yield put(addCanceledSaleSlice({...action, canceledSale}));
    } catch (error) {
        
    }
};

export function* searchSaleSaga(action){
    try {
        const sales = yield getSaleAPI();
        const newData = {...action,sales:sales.data};
        yield put(searchSaleSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* openFormSaleSaga(action){ yield put(openFormSaleSlice(action)); }
export function* closeFormSaleSaga(action){ yield put(closeFormSaleSlice(action)); }


export function* saleSaga(){
    yield takeEvery(GET_SALE, getSaleSaga);
    yield takeEvery(OPEN_FORM_SALE, openFormSaleSaga);
    yield takeEvery(CLOSE_FORM_SALE, closeFormSaleSaga);
    yield takeEvery(ADD_SALE, addSaleSaga);
    yield takeEvery(UPDATE_SALE, updateSaleSaga);
    yield takeEvery(REMOVE_SALE, removeSaleSaga);
    yield takeEvery(SEARCH_SALE, searchSaleSaga);
    yield takeEvery(ADD_CANCELED_SALE, addCanceledSaleSaga);

}