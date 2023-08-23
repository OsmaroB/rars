import React, {useEffect} from "react";
import { 
    Row,
    Button,
  } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_CUSTOMER_SALES, GET_PRICE } from '../../redux/contants';


const ListSubcategories = () => {

    const prices = useSelector(state => state.prices);
    const customerSales = useSelector(state => state.customerSales);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_PRICE});
        dispatch({type: GET_ALL_CUSTOMER_SALES});
    },[dispatch]);

    const Loading = () => {
        if(!customerSales.isCategory){
            const list = (customerSales.subcategorySelected).map((subcategory)=>{
            return(
                <Colxx xxs="3" className="" key={`SUBCAT${subcategory.id}`}>
                    <Button 
                        outline
                        className="w-100"
                        color="primary"
                        style={{'height': '160px', 'borderRadius': '10px'}}
                        onClick={()=>{
                            console.log(prices);
                        }}
                    >
                        <Row>
                        <Colxx xxs="12">
                            <h5 className="text-center">{subcategory.name}</h5>  
                        </Colxx>
                        </Row>
                    </Button>
                </Colxx>
            );
            });
            return list;
        }
        return (<></>);
    };

    return(
        <Loading />
    )
    
};

export default ListSubcategories;