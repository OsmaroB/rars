import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmRole from 'containers/forms/FrmRole';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_ROLE } from "redux/contants";

const ListRoles = () => {

    const roles = useSelector(state => state.roles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_ROLE});
    },[]);

    function NewItem(){
        if(roles.addItem){
            return(<>
                <FrmRole 
                role={{...roles.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(roles.allItems !== undefined){
            const rolesList = (roles.allItems).map((item, index)=>{
                return(
                <>
                    <FrmRole 
                        isCollapse={{collapse: false}}
                        role={{...item}}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return rolesList;
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

export default ListRoles;