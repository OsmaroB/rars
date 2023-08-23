import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmDocument from 'containers/forms/FrmDocument';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_DOCUMENTS, GET_DOCUMENT, GET_DOCUMENT_FOR_TYPE, GET_DOCUMENT_TYPE } from "redux/contants";
import {getDocumentForDocumentType} from 'apis/document';
import { useMemo } from 'react';

const ListDocuments = () => {

    const documents = useSelector(state => state.documents);
    const documentTypes = useSelector(state => state.documentTypes);
    // const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_DOCUMENT});
        dispatch({type: GET_DOCUMENT_TYPE})
        dispatch({type: GET_ALL_DOCUMENTS})
    },[]);

    function NewItem(){
        if(documents.addItem){
            return(<>
                <FrmDocument 
                document={{...documents.newItem}}
                documentTypes={documentTypes}
                isCollapse={{collapse: true}}
                key={`frm-employees-new-item`}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    const List = useMemo(()=>{
        if(documentTypes.allItems !== null && documentTypes.allItems != ''){
            if(documents.allItemsDoc.length == 0){
                dispatch({type: GET_DOCUMENT_FOR_TYPE, documentTypes:(documentTypes.allItems)})
                return(<></>);
            }else{
                const documentsList = (documents.allItemsDoc).map((item, index)=>{
                    return(
                    <>
                        <FrmDocument 
                            isCollapse={{collapse: false}}
                            document={{...item}}
                            documentTypes={documentTypes}
                            key={`frm-employees-${item.id}`}
                            index={index+1}
                        />
                    </>
                    )
                });
                return documentsList;
                
            }
        }
        return(<></>);
    },[documents.allItemsDoc, documents.allItems, documentTypes.allItems])

    return(
        <>
            <Row>
                <Colxx xxs={12}>
                    <NewItem key="new-item-employee"/>
                    {List}
                </Colxx>
            </Row>
        </>
    );
};

export default ListDocuments;