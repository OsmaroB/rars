import React from 'react';
import {
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Colxx,} from 'components/common/CustomBootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { OPEN_FORM_OPTIONAL } from 'redux/contants';
// Components
import ListOptionals from './list-optionals';

const Optionals = () => {

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
                        dispatch({type: OPEN_FORM_OPTIONAL});
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
                        dispatch({type: OPEN_FORM_OPTIONAL});
                        }}
                        >
                        Agregar
                    </Button>
                </ButtonGroup>
            </Colxx>
            <Colxx xxs={12} className="mt-4 mb-4">
                <ListOptionals />
            </Colxx>
        </Row>
    </>
    );
};

export default Optionals;