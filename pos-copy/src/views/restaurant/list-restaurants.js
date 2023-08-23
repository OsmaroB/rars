import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
// import FrmUser from 'containers/forms/FrmUser';
import FrmRestaurant from 'containers/forms/FrmRestaurant';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_RESTAURANT,GET_BRAND } from "redux/contants";

const ListRestaurants = () => {

    const restaurants = useSelector(state => state.restaurants);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_RESTAURANT});
        dispatch({type: GET_BRAND});
    },[]);

    function NewItem(){
        if(restaurants.addItem){
            return(<>
                <FrmRestaurant 
                    restaurant={{...restaurants.newItem, collapse: true}}
                    index=''  
                    brands={brands.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(restaurants.allItems !== undefined){
            const restaurantsList = (restaurants.allItems).map((item, index)=>{
                return(
                <>
                    <FrmRestaurant 
                        restaurant={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                        brands={brands.allItems}

                    />
                </>
                )
            });
            return restaurantsList;
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

export default ListRestaurants;