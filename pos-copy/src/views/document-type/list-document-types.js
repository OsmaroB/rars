import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmDocumentType from 'containers/forms/FrmDocumentType';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_DOCUMENT_TYPE } from "redux/contants";

const ListDocumentTypes = () => {

    const documentTypes = useSelector(state => state.documentTypes);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_DOCUMENT_TYPE});
    },[]);

    function NewItem(){
        if(documentTypes.addItem){
            return(<>
                <FrmDocumentType 
                documentType={{...documentTypes.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(documentTypes.allItems !== undefined){
            const documentTypesList = (documentTypes.allItems).map((item, index)=>{
                return(
                <>
                    <FrmDocumentType 
                        isCollapse={{collapse: false}}
                        documentType={{...item}}
                        key={item.id}
                        index={index+1}
                    />
                </>
                )
            });
            return documentTypesList;
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

export default ListDocumentTypes;