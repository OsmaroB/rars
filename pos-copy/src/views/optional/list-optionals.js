import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
// import FrmButton from 'containers/forms/FrmButton';
import FrmOptional from 'containers/forms/FrmOptional'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONAL } from "redux/contants";

const ListOptionals = () => {

    const optionals = useSelector(state => state.optionals);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_OPTIONAL});
    },[]);

    function NewItem(){
        if(optionals.addItem){
            return(<>
                <FrmOptional 
                optional={{...optionals.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(optionals.allItems !== undefined){
            const optionalsList = (optionals.allItems).map((item, index)=>{
                return(
                <>
                    <FrmOptional 
                        isCollapse={{collapse: false}}
                        optional={{...item}}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return optionalsList;
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

export default ListOptionals;