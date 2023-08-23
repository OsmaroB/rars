import React from "react";
import Item from "./item";

const Products = (props) =>{
    const {orders, order, orderSelected, indexProduct} = props;
    console.log(order);
    const Loading = () => {
        if(order.length > 0){
            const list = order.map((product, index)=>{
                return (
                <Item 
                    key={`products-customer-sales-item-${index}`}
                    orders={orders}
                    order={order} 
                    orderSelected={orderSelected}
                    indexProduct={indexProduct} 
                    product={product} 
                />);
            })
            return list;
        }
        return(<></>);
    };

    return(
        <>
            <Loading />    
        </>
    )
}

export default Products;