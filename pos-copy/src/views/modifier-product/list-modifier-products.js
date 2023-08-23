import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmModifierProduct from 'containers/forms/FrmModifierProduct';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_MODIFIER_PRODUCT, GET_MODIFIER, GET_PRODUCT } from "redux/contants";

const ListModifierProducts = () => {

    const modifierProducts = useSelector(state => state.modifierProducts);
    const products = useSelector(state => state.products);
    const modifiers = useSelector(state => state.modifiers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_MODIFIER_PRODUCT});
        dispatch({type: GET_MODIFIER});
        dispatch({type: GET_PRODUCT});
    },[]);

    function NewItem(){
        if(modifierProducts.addItem){
            return(<>
                <FrmModifierProduct 
                modifierProduct={{...modifierProducts.newItem}}
                products={products.allItems}
                modifiers={modifiers.allItems}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(modifierProducts.allItems !== undefined){
            const modifierProductsList = (modifierProducts.allItems).map((item, index)=>{
                return(
                <>
                    <FrmModifierProduct 
                        isCollapse={{collapse: false}}
                        modifierProduct={{...item}}
                        products={products.allItems}
                        modifiers={modifiers.allItems}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return modifierProductsList;
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

export default ListModifierProducts;