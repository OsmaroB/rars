import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmGiftCard from 'containers/forms/FrmGiftCard';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_CUSTOMER, GET_GIFTCARD, GET_BRAND } from "redux/contants";

const ListGiftCards = () => {

    const giftcards = useSelector(state => state.giftcards);
    const brands = useSelector(state => state.brands);
    const customers = useSelector(state => state.customers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_GIFTCARD});
        dispatch({type: GET_BRAND});
        dispatch({type: GET_CUSTOMER});
    },[]);

    function NewItem(){
        if(giftcards.addItem){
            return(<>
                <FrmGiftCard 
                giftcard={{...giftcards.newItem, collapse: true}}
                index=''  
                customers={customers.allItems}
                brands={brands.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(giftcards.allItems !== undefined){
            const giftcardsList = (giftcards.allItems).map((item, index)=>{
                return(
                <>
                    <FrmGiftCard 
                        giftcard={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                        customers={customers.allItems}
                        brands={brands.allItems}
                    />
                </>
                )
            });
            return giftcardsList;
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

export default ListGiftCards;