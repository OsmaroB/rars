import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmRoleDetail from 'containers/forms/FrmRoleDetail';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_ROLE_DETAIL, GET_ROLE } from "redux/contants";

const ListRoleDetails = () => {

    const roleDetails = useSelector(state => state.roleDetails);
    const roles = useSelector(state => state.roles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_ROLE_DETAIL});
        dispatch({type: GET_ROLE});
    },[]);

    function NewItem(){
        if(roleDetails.addItem){
            return(<>
                <FrmRoleDetail 
                    roleDetail={{...roleDetails.newItem}}
                    index=''  
                    isCollapse={{collapse: true}}
                    roles={roles.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(roleDetails.allItems !== undefined){
            const roleDetailsList = (roleDetails.allItems).map((item, index)=>{
                // rolesName search
                let roleName;
                (roles.allItems).map((element)=>{
                    if(element.id === item.roleID){
                        roleName = element.name;
                        return null;
                    }
                    return null;
                });
                return(
                <>
                    <FrmRoleDetail 
                        roleDetail={{...item, roleName}}
                        key={item.id}
                        index={index+1}
                        isCollapse={{collapse: false}}
                        roles={roles.allItems}
                    />
                </>
                )
            });
            return roleDetailsList;
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

export default ListRoleDetails;