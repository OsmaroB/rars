import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmPaymentMethod from 'containers/forms/FrmPaymentMethod';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_PAYMENT_METHOD } from "redux/contants";

const ListPaymentMethods = () => {

    const paymentMethods = useSelector(state => state.paymentMethods);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_PAYMENT_METHOD});
    },[]);

    function NewItem(){
        if(paymentMethods.addItem){
            return(<>
                <FrmPaymentMethod 
                paymentMethod={{...paymentMethods.newItem, collapse: true}}
                index=''  
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        console.log(paymentMethods)
        if(paymentMethods.allItems !== undefined){
            const paymentMethodsList = (paymentMethods.allItems).map((item, index)=>{
                return(
                <>
                    <FrmPaymentMethod 
                        paymentMethod={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return paymentMethodsList;
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

export default ListPaymentMethods;