import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmPaymentMethodDetail from 'containers/forms/FrmPaymentMethodDetail';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_PAYMENT_METHOD, GET_PAYMENT_METHOD_DETAIL } from "redux/contants";

const ListPaymentMethodDetails = () => {

    const paymentMethodDetails = useSelector(state => state.paymentMethodDetails);
    const paymentMethods = useSelector(state => state.paymentMethods);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_PAYMENT_METHOD_DETAIL});
        dispatch({type: GET_PAYMENT_METHOD});
    },[]);

    function NewItem(){
        if(paymentMethodDetails.addItem){
            return(<>
                <FrmPaymentMethodDetail 
                    paymentMethodDetail={{...paymentMethodDetails.newItem, collapse: true}}
                    index=''  
                    paymentMethods={paymentMethods.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(paymentMethodDetails.allItems !== undefined){
            const paymentMethodDetailsList = (paymentMethodDetails.allItems).map((item, index)=>{
                return(
                <>
                    <FrmPaymentMethodDetail 
                        paymentMethodDetail={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                        paymentMethods={paymentMethods.allItems}
                    />
                </>
                )
            });
            return paymentMethodDetailsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    return(
        <>
            <Row>
                <Colxx xxs={12}>
                    <NewItem />
                    <List />
                </Colxx>
            </Row>
        </>
    );
};

export default ListPaymentMethodDetails;