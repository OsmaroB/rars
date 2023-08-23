import React from 'react';
import {
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Colxx,} from 'components/common/CustomBootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { OPEN_FORM_ROLE } from 'redux/contants';
// Components
import ListRoles from './list-roles';

const Role = () => {

    const dispatch = useDispatch();

    return(
    <>
        <Row>
            <Colxx xxs={12}>
                <ButtonGroup>
                    <Button 
                        outline 
                        className="float-left" 
                        color="primary"
                        onClick={()=>{
                        dispatch({type: OPEN_FORM_ROLE});
                        }}
                    >
                        <div 
                        className="glyph-icon simple-icon-plus"
                        style={{'fontSize': '18px'}}
                        />
                    </Button>
                    <Button 
                        outline 
                        className="float-left" 
                        color="primary"
                        style={{"fontSize":"15px"}}
                        onClick={()=>{
                        dispatch({type: OPEN_FORM_ROLE});
                        }}
                        >
                        Agregar
                    </Button>
                </ButtonGroup>
            </Colxx>
            <Colxx xxs={12} className="mt-4 mb-4">
                <ListRoles />
            </Colxx>
        </Row>
    </>
    );
};

export default Role;