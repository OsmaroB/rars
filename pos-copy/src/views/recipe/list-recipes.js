import React,{ useEffect,useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmRecipe from 'containers/forms/FrmRecipe';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_RECIPE } from "redux/contants";

const ListRecipes = () => {

    const recipes = useSelector(state => state.recipes);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_RECIPE});
    },[]);

    function NewItem(){
        if(recipes.addItem){
            return(<>
                <FrmRecipe 
                recipe={{...recipes.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(recipes.allItems !== undefined){

            let recipesList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(recipes.allItems).length){
                    recipesList.push(
                        <FrmRecipe 
                        isCollapse={{collapse: false}}
                        recipe={{...recipes.allItems[index]}}
                        key={`recipe-list-item-${index}`}
                        index={index+1}
                    />   
                    )
                }
            }
            // const recipesList = (recipes.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmRecipe 
            //             isCollapse={{collapse: false}}
            //             recipe={{...item}}
            //             key={item.id}
            //             index={index+1}
            //         />
            //     </>
            //     )
            // });
            return recipesList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(recipes.allItems !== undefined){
            totalPage = Math.ceil((recipes.allItems).length / itemsPerPage);
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
                    setFrom(((recipes.allItems).length)-itemsPerPage);
                    setUntil((recipes.allItems).length);
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
            <Row>
                <Colxx xxs={12}>
                    <NewItem />
                    <List />
                    <PaginationInPage />
                </Colxx>
            </Row>
        </>
    );
};

export default ListRecipes;