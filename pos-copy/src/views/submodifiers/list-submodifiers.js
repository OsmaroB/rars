import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmSubmodifier from 'containers/forms/FrmSubmodifier';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_SUBMODIFIER, GET_MODIFIER } from "redux/contants";

const ListSubmodifiers = () => {

    const submodifiers = useSelector(state => state.submodifiers);
    const modifiers = useSelector(state => state.modifiers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_SUBMODIFIER});
        dispatch({type: GET_MODIFIER});
    },[]);

    function NewItem(){
        if(submodifiers.addItem){
            return(<>
                <FrmSubmodifier 
                submodifier={{...submodifiers.newItem}}
                modifiers={modifiers.allItems}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(submodifiers.allItems !== undefined){
            const submodifiersList = (submodifiers.allItems).map((item, index)=>{
                return(
                <>
                    <FrmSubmodifier 
                        isCollapse={{collapse: false}}
                        submodifier={{...item}}
                        modifiers={modifiers.allItems}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return submodifiersList;
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

export default ListSubmodifiers;