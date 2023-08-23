import React,{useState} from "react";
import {
    Card,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
} from 'reactstrap';
import { Colxx } from "components/common/CustomBootstrap";
import { useDispatch } from "react-redux";
import { SEARCH_SUBCATEGORY } from "redux/contants";

const SrchSubCategory = ()=> {

    const dispatch = useDispatch();
    const [name, setName] = useState('');


    const search = (value) => {
        dispatch({type: SEARCH_SUBCATEGORY, filter: value});
    };

    return(
        <>
            <Card>
                <Row className="m-2">
                <Colxx xxs="12">
                    <Form>
                    <FormGroup>
                        <div className="mt-3 mb-3">
                        <Label>Buscador</Label>
                        <Input
                            type="text"
                            className="rounded"
                            placeholder="Realiza búsqueda por nombre"
                            value={name}
                            onChange={(e)=>{
                                    setName(e.target.value);
                                    search(e.target.value);
                                }
                            }
                        />
                        </div>
                    </FormGroup>
                    </Form>
                </Colxx>
                </Row>
            </Card>
        </>
    );
};

export default SrchSubCategory;