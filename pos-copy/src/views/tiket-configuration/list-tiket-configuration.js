import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmTiketConfiguration from 'containers/forms/FrmTiketConfiguration';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_TIKET_CONFIGURATION } from "redux/contants";

const ListTiketConfiguration = () => {

    const tiketConfigurations = useSelector(state => state.tiketConfigurations);
    // const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_TIKET_CONFIGURATION});
    },[]);

    function NewItem(){
        if(tiketConfigurations.addItem){
            return(<>
                <FrmTiketConfiguration 
                tiketConfiguration={{...tiketConfigurations.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(tiketConfigurations.allItems !== undefined){
            const tiketConfigurationsList = (tiketConfigurations.allItems).map((item, index)=>{
                return(
                <>
                    <FrmTiketConfiguration 
                        isCollapse={{collapse: false}}
                        tiketConfiguration={{...item}}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return tiketConfigurationsList;
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

export default ListTiketConfiguration;