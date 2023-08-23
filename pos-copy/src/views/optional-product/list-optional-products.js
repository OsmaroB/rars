import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmOptionalProduct from 'containers/forms/FrmOptionalProduct';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONAL_PRODUCT, GET_PRODUCT, GET_OPTIONAL } from "redux/contants";

const ListOptionalProducts = () => {

    const optionalProducts = useSelector(state => state.optionalProducts);
    const products = useSelector(state => state.products);
    const optionals = useSelector(state => state.optionals);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_OPTIONAL_PRODUCT});
        dispatch({type: GET_PRODUCT});
        dispatch({type: GET_OPTIONAL});
    },[]);

    function NewItem(){
        if(optionalProducts.addItem){
            return(<>
                <FrmOptionalProduct 
                    optionalProduct={{...optionalProducts.newItem}}
                    index=''  
                    isCollapse={{collapse: true}}
                    products={products.allItems}
                    optionals={optionals.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(optionalProducts.allItems !== undefined){
            const optionalProductsList = (optionalProducts.allItems).map((item, index)=>{
                return(
                <>
                    <FrmOptionalProduct 
                        optionalProduct={{...item}}
                        key={item.id}
                        index={index+1}
                        isCollapse={{collapse: false}}
                        products={products.allItems}
                        optionals={optionals.allItems}
                    />
                </>
                )
            });
            return optionalProductsList;
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

export default ListOptionalProducts;