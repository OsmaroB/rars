import React,{ useEffect, useState } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmProductDetail from 'containers/forms/FrmProductDetail';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT, GET_PRODUCT_DETAIL, GET_RECIPE} from "redux/contants";

const ListProductDetails = () => {

    const productDetails = useSelector(state => state.productDetails);
    const recipes = useSelector(state => state.recipes);
    const products = useSelector(state => state.products);// for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_RECIPE});
        dispatch({type: GET_PRODUCT});
        dispatch({type: GET_PRODUCT_DETAIL});
    },[]);

    function NewItem(){
        if(productDetails.addItem){
            return(<>
                <FrmProductDetail 
                    productDetail={{...productDetails.newItem}}
                    index=''  
                    isCollapse={{collapse: true}}
                    products={products.allItems}
                    recipes={recipes.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(productDetails.allItems !== undefined){

            let productDetailsList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(productDetails.allItems).length){
                    productDetailsList.push(
                        <FrmProductDetail 
                            productDetail={{...productDetails.allItems[index]}}
                            key={`list-product-detail-item-${index}`}
                            index={index+1}
                            isCollapse={{collapse: false}}
                            products={products.allItems}
                            recipes={recipes.allItems}
                        />   
                    )
                }
            }
            // const productDetailsList = (productDetails.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmProductDetail 
            //             productDetail={{...item}}
            //             key={item.id}
            //             index={index+1}
            //             isCollapse={{collapse: false}}
            //             products={products.allItems}
            //             recipes={recipes.allItems}
            //         />
            //     </>
            //     )
            // });
            return productDetailsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(productDetails.allItems !== undefined){
            totalPage = Math.ceil((productDetails.allItems).length / itemsPerPage);
            return(
                <Pagination
                size="md"
                aria-label="Page navigation example"
                listClassName="justify-content-center"
              >
                <PaginationItem>
                <PaginationLink className="first" href="#" onClick={(e)=>{
                    e.preventDefault();
                    setCurrentPage(1);
                    setFrom(0);
                    setUntil(itemsPerPage);
                }}>
                    <i className="simple-icon-control-start" />
                </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink className="prev" href="#" 
                    onClick={(e)=>{
                        e.preventDefault();
                        if(currentPage > 1){
                            setCurrentPage(currentPage-1);
                            setFrom(from-(itemsPerPage*2));
                            setFrom(from-itemsPerPage);
                        }
                    }}
                >
                    <i className="simple-icon-arrow-left" />
                </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                <PaginationLink href="#">{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink className="next" href="#"
                onClick={(e)=>{
                    e.preventDefault();
                    if(currentPage <totalPage){
                        setCurrentPage(currentPage+1);
                        setFrom(from+itemsPerPage);
                        setUntil(from+(itemsPerPage*2))
                    }
                }}
                >
                    <i className="simple-icon-arrow-right" />
                </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink className="last" href="#" onClick={(e)=>{
                    e.preventDefault();
                    setCurrentPage(totalPage);
                    setFrom(((productDetails.allItems).length)-itemsPerPage);
                    setUntil((productDetails.allItems).length);
                }}>
                    <i className="simple-icon-control-end" />
                </PaginationLink>
                </PaginationItem>
            </Pagination>
            )
        }else{
            return(<></>);
        }
    }

    return(
        <>
                <Colxx xxs={12}>
                    <NewItem />
                    <List />
                    <PaginationInPage />
                </Colxx>
        </>
    );
};

export default ListProductDetails;